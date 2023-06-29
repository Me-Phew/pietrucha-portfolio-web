<script setup lang="ts">
import type { UseWindowSizeReturn } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core';
import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass,
  Selection,
  SelectiveBloomEffect,
} from 'postprocessing';
import Stats from 'stats.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FolderApi, Pane } from 'tweakpane';
import { onMounted, onUnmounted, ref, watch } from 'vue';

interface Config {
  debug?: boolean;
}

interface Objects {
  polaroid: THREE.Object3D;
  viefinderFront: THREE.Object3D;
  viefinderBack: THREE.Object3D;
  powerLED: THREE.Object3D;
}

interface ObjectNames {
  polaroid: string;
  viefinderFront: string;
  viefinderBack: string;
  powerLED: string;
}

const objectNames = {
  polaroid: 'Polaroid',
  viefinderFront: 'Viefinder_Front',
  viefinderBack: 'Viefinder_Back',
  powerLED: 'Power_LED',
};

interface Animations {
  switchPolaroidOn: THREE.AnimationAction;
  switchPolaroidOff: THREE.AnimationAction;
}

interface AnimationNames {
  switchPolaroidOn: string;
  switchPolaroidOff: string;
}

const animationNames = {
  switchPolaroidOn: 'Switch_Polaroid_On',
  switchPolaroidOff: 'Switch_Polaroid_Off',
};

interface DebugGUIFolders {
  cameraFolder?: FolderApi;
  mainLightFolder?: FolderApi;
}

interface Lights {
  mainLight: THREE.PointLight;
}

class Application {
  // Basic setup
  $canvas: HTMLCanvasElement | undefined;
  config: Config = {};
  windowSize: UseWindowSizeReturn = useWindowSize();
  scene: THREE.Scene;
  loader: GLTFLoader = new GLTFLoader();
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera;
  lights: Lights;
  renderingLoopAnimationFrameRequestId: number | undefined;
  animationMixer: THREE.AnimationMixer | undefined;
  enablePolaroidClip: THREE.AnimationClip | undefined;
  enablePolaroidAction: THREE.AnimationAction | undefined;
  clock: THREE.Clock = new THREE.Clock();

  // Posteffects
  bloomSelection: Selection = new Selection();
  selectiveBloom: SelectiveBloomEffect;
  effectPass: EffectPass;
  composer: EffectComposer | undefined;

  // Objects
  objectNames: ObjectNames;
  objects: Objects | undefined;

  // Animations
  animationNames: AnimationNames;
  animations: Animations;

  // Debug
  debugGUI: Pane | undefined;
  debugGUIFolders: DebugGUIFolders = {};
  stats: Stats | undefined;
  axesHelper: THREE.AxesHelper | undefined;
  orbitControls: OrbitControls | undefined;

  constructor(
    _options: {
      modelPaths: Array<string>;
      objectNames: ObjectNames;
      animationNames: AnimationNames;
    },
    _config: Config,
  ) {
    this.config = _config;

    this.scene = new THREE.Scene();
    this.initScene();

    if (this.config.debug) {
      this.debugGUI = new Pane();

      this.stats = new Stats();
      this.initStats();

      this.initDebugHelpers();
    }

    this.animationMixer = new THREE.AnimationMixer(this.scene);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.windowSize.width.value / this.windowSize.height.value,
      0.1,
      1000,
    );
    this.initCamera();

    this.lights = {
      mainLight: new THREE.PointLight(new THREE.Color('white'), 2),
    };
    this.initLights();

    this.loadModels(_options.modelPaths);

    this.objectNames = _options.objectNames;
    // this.objects = {
    //   polaroid: this.getObjectSafely(this.objectNames.polaroid),
    //   powerLED: this.getObjectSafely(this.objectNames.powerLED),
    //   viefinderBack: this.getObjectSafely(this.objectNames.viefinderBack),
    //   viefinderFront: this.getObjectSafely(this.objectNames.viefinderFront),
    // };

    this.animationNames = _options.animationNames;

    this.selectiveBloom = new SelectiveBloomEffect(this.scene, this.camera, {
      blendFunction: BlendFunction.ADD,
      mipmapBlur: true,
      luminanceThreshold: 0.4,
      luminanceSmoothing: 0.3,
      intensity: 3.0,
    });

    this.initSelectiveBloom();
    this.effectPass = new EffectPass(this.camera, this.selectiveBloom);
  }

  loadModels(modelPaths: Array<string>) {
    for (const modelPath of modelPaths) {
      this.loader.load(
        modelPath,
        (gltf) => {
          this.scene.add(gltf.scene);

          this.enablePolaroidClip = THREE.AnimationClip.findByName(
            gltf.animations,
            'Switch_Camera_On',
          );
          this.enablePolaroidAction = this.animationMixer?.clipAction(this.enablePolaroidClip);
          this.enablePolaroidAction!.clampWhenFinished = true;
          this.enablePolaroidAction!.loop = THREE.LoopOnce;
          const btn = this.debugGUI.addButton({
            title: 'Play animation',
          });
          btn.on('click', () => {
            this.enablePolaroidAction!.play();
          });

          this.objects = {
            polaroid: this.getObjectSafely(this.objectNames.polaroid),
            powerLED: this.getObjectSafely(this.objectNames.powerLED),
            viefinderBack: this.getObjectSafely(this.objectNames.viefinderBack),
            viefinderFront: this.getObjectSafely(this.objectNames.viefinderFront),
          };
        },
        undefined,
        (error) => {
          console.error(error);
        },
      );
    }
  }

  initScene() {
    this.scene.background = new THREE.Color(0x080808);
  }

  initCamera() {
    this.camera.position.z = 15;
    this.scene.add(this.camera);

    if (this.config.debug) {
      this.debugGUIFolders!.cameraFolder = this.debugGUI!.addFolder({
        title: 'Camera',
        expanded: true,
      });
      this.debugGUIFolders!.cameraFolder!.addInput(this.camera, 'position');
      this.debugGUIFolders!.cameraFolder!.addInput(this.camera, 'rotation');
    }
  }

  initLights() {
    this.lights.mainLight.position.set(0, 5, 8);
    this.scene.add(this.lights.mainLight);

    if (this.config.debug) {
      this.debugGUIFolders!.mainLightFolder = this.debugGUI!.addFolder({
        title: 'Main light',
        expanded: true,
      });
      this.debugGUIFolders!.mainLightFolder.addInput(this.lights.mainLight, 'intensity');
      this.debugGUIFolders!.mainLightFolder.addInput(this.lights.mainLight, 'position');
      this.debugGUIFolders!.mainLightFolder.addInput(this.lights.mainLight, 'color', {
        color: { type: 'float' },
      });
    }
  }

  getObjectSafely(objectName: string): THREE.Object3D {
    const object = this.scene.getObjectByName(objectName);

    if (object === undefined) {
      throw new Error(`Object not found ${objectName} `);
    }

    return object;
  }

  initSelectiveBloom() {
    this.selectiveBloom.ignoreBackground = true;
    this.selectiveBloom.selection = this.bloomSelection;
  }

  initStats() {
    this.stats!.showPanel(0);
    document.body.appendChild(this.stats!.dom);
  }

  initDebugHelpers() {
    this.axesHelper = new THREE.AxesHelper(100);
    this.scene.add(this.axesHelper);
  }

  initOrbitControls() {
    this.orbitControls = new OrbitControls(this.camera, this.$canvas);
    this.orbitControls.enableDamping = true;
  }

  run(canvas: HTMLCanvasElement) {
    this.$canvas = canvas;

    if (this.config.debug) {
      this.initOrbitControls();
    }

    this.initRenderer();
    this.setupWindowResizeHandling();
    this.initPostprocessing();
    this.renderingLoop();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      antialias: true,
    });

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.windowSize.width.value, this.windowSize.height.value);
  }

  initPostprocessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effectPass);
  }

  handleWindowResize() {
    this.renderer!.setSize(this.windowSize.width.value, this.windowSize.height.value);
    this.camera.aspect = this.windowSize.width.value / this.windowSize.height.value;
    this.camera.updateProjectionMatrix();
  }

  setupWindowResizeHandling() {
    watch(this.windowSize.width, () => {
      this.handleWindowResize();
    });

    watch(this.windowSize.height, () => {
      this.handleWindowResize();
    });
  }

  renderingLoop() {
    if (this.config.debug) {
      this.stats!.begin();
      this.debugGUI!.refresh();
      this.orbitControls!.update();
    }

    this.animationMixer!.update(this.clock.getDelta());
    this.composer!.render();

    if (this.config.debug) {
      this.stats!.end();
    }

    this.renderingLoopAnimationFrameRequestId = window.requestAnimationFrame(
      this.renderingLoop.bind(this),
    );
  }

  dispose() {
    if (this.composer != undefined) {
      this.composer.dispose();
    }

    if (this.debugGUI != undefined) {
      this.debugGUI.dispose();
    }

    if (this.renderingLoopAnimationFrameRequestId != undefined) {
      window.cancelAnimationFrame(this.renderingLoopAnimationFrameRequestId);
    }
  }
}

const webglCanvas = ref<null | HTMLCanvasElement>(null);

// const application = new Application(
//   {
//     modelPaths: ['/polaroid-edit-animation.glb'],
//     objectNames,
//     animationNames,
//   },
//   { debug: true },
// );

// onMounted(() => {
//   application.run(webglCanvas.value!);
// });

// onUnmounted(() => {
//   application.dispose();
// });
</script>

<template>
  <div class="polaroid-webgl">
    <canvas
      class="webgl"
      ref="webglCanvas"
    ></canvas>
  </div>
</template>

<style scoped></style>
