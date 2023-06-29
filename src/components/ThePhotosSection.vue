<script setup lang="ts">
import BaseGallery from '@/components/BaseGallery.vue';
import BaseModal from '@/components/BaseModal.vue';
import { useHomePageSectionsStore } from '@/stores/homePageSections';
import { onMounted, ref } from 'vue';
import sunrisePhoto from '/photos/20200516_052227-2.jpg';
import flowerPhoto from '/photos/20200617_162203-2.jpg';
import mistySunRays from '/photos/20200714_183506.jpg';
import dogWithBone from '/photos/Bajzel_sgf-131927.jpg';
import trolley from '/photos/IMG_0826.jpg';

const homePageSectionsStore = useHomePageSectionsStore();

const photosSection = ref(null);

const galleryModalOpen = ref(false);

onMounted(() => {
  homePageSectionsStore.photos = photosSection.value;
});
</script>

<template>
  <section
    class="photos"
    ref="photosSection"
  >
    <div
      class="showcase"
      @click="galleryModalOpen = true"
      v-ripple
    >
      <button class="blob-button">
        <svg
          width="356"
          height="356"
        >
          <path fill="var(--text-color)">
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
              m 298.82964,49.05139 c 28.7,27.8 39.3,73.5 38.6,114.6 -0.6,41.1 -12.4,77.5 -31.5,109.1 -19.1,31.5 -45.5,58.1 -72.9,57.8 -27.5,-0.3 -56.1,-27.6 -96.1,-36.5 -39.9,-9 -91.2,0.3 -112.3,-17.1 -21.1,-17.4 -12,-61.5 7.5,-91.9 19.5,-30.4 49.4,-47.1 75.1,-75.4 25.8,-28.2 47.5,-68.1 81.7,-83.2 34.3,-15 81.1,-5.2 109.9,22.6; 
              m 243.17375,93.99962 c 34.3,30.4 82.6,42.5 84.2,61.5 1.7,19 -43.2,44.7 -67.1,79.5 -23.9,34.7 -26.7,78.3 -47.1,95 -20.4,16.6 -58.3,6.3 -95.2,-7.1 -36.8,-13.4 -72.6,-29.9 -87.1,-57.5 -14.6,-27.6 -8.1,-66.2 5.4,-96.9 13.4,-30.7 33.8,-53.5 56.9,-85.8 23.1,-32.4 49.1,-74.4 72.2,-71.1 23.2,3.3 43.5,52 77.8,82.4; 
              m 298.82964,49.05139 c 28.7,27.8 39.3,73.5 38.6,114.6 -0.6,41.1 -12.4,77.5 -31.5,109.1 -19.1,31.5 -45.5,58.1 -72.9,57.8 -27.5,-0.3 -56.1,-27.6 -96.1,-36.5 -39.9,-9 -91.2,0.3 -112.3,-17.1 -21.1,-17.4 -12,-61.5 7.5,-91.9 19.5,-30.4 49.4,-47.1 75.1,-75.4 25.8,-28.2 47.5,-68.1 81.7,-83.2 34.3,-15 81.1,-5.2 109.9,22.6"
            />
          </path>
        </svg>

        <span class="text-content">Open gallery</span>
      </button>

      <div
        class="card dog-with-bone"
        :style="`background-image: url(${dogWithBone});`"
      ></div>

      <div
        class="card trolley"
        :style="`background-image: url(${trolley});`"
      ></div>

      <div
        class="card misty-sun-rays"
        :style="`background-image: url(${mistySunRays});`"
      ></div>

      <div
        class="card flower"
        :style="`background-image: url(${flowerPhoto});`"
      ></div>

      <div
        class="card sunrise"
        :style="`background-image: url(${sunrisePhoto});`"
      ></div>

      <div class="headline-text">
        <span class="text-content thin">my</span>
        <span class="text-content bold">photos</span>
      </div>
    </div>

    <BaseModal v-model:open="galleryModalOpen">
      <template #title>My photos</template>
      <BaseGallery />
    </BaseModal>
  </section>
</template>

<style scoped lang="scss">
.photos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  -webkit-font-smoothing: subpixel-antialiased;

  .showcase {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    position: relative;
    cursor: pointer;

    .headline-text {
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1000;
      color: $text-color;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .text-content {
        font-size: 16rem;

        &.bold {
          font-weight: bolder;
        }

        &.thin {
          font-weight: lighter;
        }
      }
    }

    &:hover {
      .bold {
        transform: translate(80%) rotate(4deg);
      }

      .thin {
        transform: translate(-70%) rotate(-4deg);
      }

      .sunrise {
        transform: translate(-80%, 30%) rotate(-4deg);
      }

      .trolley {
        transform: translate(100%, -20%) rotate(4deg);
      }

      .flower {
        transform: translate(-130%, -190%) rotate(-4deg);
      }

      .misty-sun-rays {
        transform: translate(90%, -150%) rotate(4deg);
      }

      .dog-with-bone {
        transform: translate(200%, 35%) rotate(4deg);
      }

      // .sunrise {
      //   transform: translate(80%, 30%) rotate(4deg);
      // }

      // .trolley {
      //   transform: translate(-100%, -20%) rotate(-4deg);
      // }

      // .flower {
      //   transform: translate(130%, -150%) rotate(4deg);
      // }

      // .misty-sun-rays {
      //   transform: translate(-100%, -110%) rotate(-4deg);
      // }

      // .dog-with-bone {
      //   transform: translate(-200%, 50%) rotate(-4deg);
      // }

      .blob-button {
        opacity: 1;
      }
    }
  }

  .blob-button {
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    display: flex;
    opacity: 0;
    transition: all 800ms;

    &:focus {
      outline: none;
    }

    &:hover {
      .blob {
        transform: scale(1.2);
      }
    }

    &::-moz-focus-inner {
      border: 0;
    }

    .blob {
      outline: none;
      transition: transform 0.3s linear;
      cursor: pointer;
    }

    .text-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $background-color;
      font-size: 1.8rem;
      width: 100%;
      font-family: 'Cutive Mono', monospace;
      font-weight: 1000;
    }
  }
}

.card {
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  position: absolute;
  transition: z-index 1s;
  transition: transform 800ms cubic-bezier(0.05, 0.43, 0.25, 0.95);
  bottom: 15%;
  background-repeat: no-repeat;
  background-size: cover;

  &.sunrise {
    height: 400px;
    width: 700px;
    transform: translate(-15%, 10%);
    z-index: 40;
  }

  &.trolley {
    height: 400px;
    width: 500px;
    transform: translate(25%, -25%);
    z-index: 30;
    background-position: 100%;
  }

  &.flower {
    height: 250px;
    width: 350px;
    transform: translate(-70%, -155%);
    z-index: 20;
  }

  &.misty-sun-rays {
    height: 300px;
    width: 400px;
    transform: translate(10%, -140%);
    z-index: 10;
  }

  &.dog-with-bone {
    height: 350px;
    width: 200px;
    transform: translate(50%, 30%);
    background-position: 20%;
    z-index: 50;
  }
}
</style>
