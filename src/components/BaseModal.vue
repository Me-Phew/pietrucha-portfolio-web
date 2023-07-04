<script setup lang="ts">
import IconButton, { TooltipPosition } from '@/components/IconButton.vue';
import { PhCornersOut, PhFrameCorners, PhX } from '@phosphor-icons/vue';
import {
  useFullscreen,
  useMouse,
  useMouseInElement,
  useMousePressed,
  watchThrottled,
} from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { NScrollbar } from 'naive-ui';
import { computed, nextTick, ref, watch } from 'vue';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:open']);

const modal = ref<HTMLElement | null>(null);

const { activate: activateModalFocus, deactivate: deactivateModalFocus } = useFocusTrap(modal, {
  escapeDeactivates: false,
});

const shake = ref(false);
const closing = ref(false);

const modalOpen = ref(props.open);

const fullscreenWrapper = ref<HTMLElement | null>(null);

const { isFullscreen, exit, toggle } = useFullscreen(fullscreenWrapper);

const toggleFullscreen = () => {
  toggle();
};

const exitFullscreen = () => {
  if (isFullscreen.value) {
    exit();
  }
};

const fullscreenBtn = ref<HTMLElement | null>(null);
const expandBtn = ref<HTMLElement | null>(null);
const closeBtn = ref<HTMLElement | null>(null);

const { isOutside: isOutsideFullscreenBtn } = useMouseInElement(fullscreenBtn);
const { isOutside: isOutsideExpandBtn } = useMouseInElement(expandBtn);
const { isOutside: isOutsideCloseBtn } = useMouseInElement(closeBtn);

const mouseIsOverControls = computed(() => {
  return !isOutsideFullscreenBtn.value || !isOutsideExpandBtn.value || !isOutsideCloseBtn.value;
});

const { pressed } = useMousePressed();

const controlsHidden = ref<boolean>(false);

const { x, y } = useMouse();

const hideControls = () => {
  controlsHidden.value = true;
};

let hideControlsTimerId: number;

const setHideControlsTimeout = () => {
  hideControlsTimerId = setTimeout(() => {
    if (!mouseIsOverControls.value && !pressed.value) {
      hideControls();
    }
  }, 500);
};

const removeHideControlsTimeout = () => {
  clearTimeout(hideControlsTimerId);
};

const showControls = () => {
  removeHideControlsTimeout();
  controlsHidden.value = false;
  setHideControlsTimeout();
};

let cancelXWatch: Function;
let cancelYWatch: Function;

const closeModal = () => {
  exitFullscreen();

  if (!closing.value) {
    deactivateModalFocus();
    closing.value = true;
    emit('update:open', false);

    if (props.fullscreen) {
      document.removeEventListener('mouseup', setHideControlsTimeout);
      cancelXWatch();
      cancelYWatch();
      removeHideControlsTimeout();
    }

    setTimeout(() => {
      modalOpen.value = false;
      closing.value = false;

      if (props.fullscreen) {
        controlsHidden.value = false;
      }
    }, 400);
  }
};

const shakeModal = () => {
  shake.value = true;
  setTimeout(() => {
    shake.value = false;
  }, 1000);
};

const handleModalClick = () => {
  if (props.closeOnClickOutside && !props.persistent) {
    closeModal();
  } else {
    shakeModal();
  }
};

const handleModalClose = () => {
  if (!props.persistent) {
    closeModal();
  } else {
    shakeModal();
  }
};

const openModal = async () => {
  modalOpen.value = true;

  await nextTick();
  activateModalFocus();

  if (props.fullscreen) {
    document.addEventListener('mouseup', setHideControlsTimeout);

    cancelXWatch = watchThrottled(x, showControls, { throttle: 500 });
    cancelYWatch = watchThrottled(y, showControls, { throttle: 500 });

    setHideControlsTimeout();
  }
};

watch(
  () => props.open,
  async (newValue) => {
    if (newValue) {
      await openModal();
    } else {
      closeModal();
    }
  },
);

enum ObjectFit {
  contain = 'contain',
  cover = 'cover',
}

const objectFit = ref<ObjectFit>(ObjectFit.contain);

const toggleObjectFit = () => {
  switch (objectFit.value) {
    case ObjectFit.contain: {
      objectFit.value = ObjectFit.cover;
      break;
    }
    case ObjectFit.cover: {
      objectFit.value = ObjectFit.contain;
      break;
    }
  }
};

const expandBtnText = computed(() => {
  switch (objectFit.value) {
    case ObjectFit.contain: {
      return 'Powiększ';
    }
    case ObjectFit.cover: {
      return 'Dopasuj rozmiar';
    }
    default: {
      return '';
    }
  }
});
</script>

<template>
  <teleport to="body">
    <Transition
      v-if="modalOpen"
      appear
    >
      <div
        ref="modal"
        class="modal"
        :class="{ open: modalOpen, closing: closing, fullscreen: fullscreen }"
        @keyup.esc="handleModalClose"
        tabindex="0"
      >
        <div
          class="modal-overlay"
          @click="handleModalClick"
        ></div>
        <div
          ref="modalContent"
          class="modal-content"
          :class="{ shake: shake }"
          tabindex="0"
        >
          <template v-if="fullscreen">
            <div
              class="fullscreen-wrapper"
              ref="fullscreenWrapper"
            >
              <IconButton
                class="close-btn"
                :class="{ hidden: controlsHidden }"
                v-if="!persistent"
                @click="closeModal"
                @keyup.enter="closeModal"
                ref="closeBtn"
              >
                <PhX size="34" />
                <template #tooltip-text>
                  <span>Zamknij</span>
                </template>
              </IconButton>

              <div
                class="bottom-controls"
                :class="{ hidden: controlsHidden }"
              >
                <IconButton
                  v-if="isFullscreen"
                  class="expand-btn"
                  @click="toggleObjectFit"
                  @keyup.enter="toggleObjectFit"
                  :tooltipPosition="TooltipPosition.top"
                  ref="expandBtn"
                >
                  <PhFrameCorners size="34" />
                  <template #tooltip-text>
                    <span>{{ expandBtnText }}</span>
                  </template>
                </IconButton>

                <IconButton
                  class="fullscreen-btn"
                  @click="toggleFullscreen"
                  @keyup.enter="toggleFullscreen"
                  :tooltipPosition="TooltipPosition.top"
                  ref="fullscreenBtn"
                >
                  <PhCornersOut size="34" />
                  <template #tooltip-text>
                    <span>Pełny ekran</span>
                  </template>
                </IconButton>
              </div>
              <div
                class="body"
                :class="{
                  'fullscreen-enabled': isFullscreen,
                  contain: objectFit === ObjectFit.contain,
                  cover: objectFit === ObjectFit.cover,
                }"
              >
                <slot />
              </div>
            </div>
          </template>

          <template v-else>
            <div class="header">
              <div class="title">
                <slot name="title" />
              </div>
              <IconButton
                class="close-btn"
                v-if="!persistent"
                @click="closeModal"
                @keyup.enter="closeModal"
              >
                <PhX size="34" />
                <template #tooltip-text>
                  <span>Zamknij</span>
                </template>
              </IconButton>
            </div>
            <div class="body">
              <n-scrollbar trigger="none">
                <slot />
              </n-scrollbar>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style lang="scss">
.body {
  .n-scrollbar-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.fullscreen .modal-content .body.fullscreen-enabled {
  * {
    border-radius: 0;
  }

  &.cover {
    * {
      object-fit: cover;
    }
  }

  &.contain {
    * {
      object-fit: contain;
    }
  }
}
</style>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  &.open {
    visibility: visible;

    .modal-content {
      transform: scale(1);
    }

    &.v-enter-from {
      .modal-content {
        transform: scale(0);
      }
    }

    &.closing {
      .modal-content {
        transform: scale(0);
      }
    }
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  &.fullscreen {
    .modal-content {
      overflow: visible;
      align-items: flex-end;
      max-width: 95vw;
      grid-template-rows: auto;

      .fullscreen-wrapper {
        height: 100%;
        position: relative;
        overflow: hidden;

        .bottom-controls,
        .close-btn {
          transition: transform $transition-duration;
          position: absolute;
          right: 1.25rem;
        }

        .bottom-controls {
          bottom: 0.75rem;
          display: flex;
          gap: 0.5rem;

          &.hidden {
            transform: translateY(calc(100% + 0.75rem));
          }
        }

        .close-btn {
          top: 0.75rem;

          &.hidden {
            transform: translateY(calc(-100% - 0.75rem));
          }
        }
        .body {
          padding: 0;

          &.fullscreen-enabled {
            max-height: 100vh;
          }
        }
      }
    }
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
  }

  .modal-content {
    transform: scale(0);
    background-color: $background-color;
    color: $text-color;
    border-radius: 0.5rem;
    box-shadow: 0 0 6px -2px rgba(245, 245, 247, 0.4);
    z-index: 1000;
    height: 95vh;
    overflow: auto;
    display: grid;
    grid-template-rows: 60px auto;

    &:focus {
      border: none;
      outline: none;
    }

    &.shake {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    .header {
      height: 100%;
      display: grid;
      grid-template-columns: auto 34px;
      justify-items: center;
      align-items: center;
      padding: 0rem 1rem;
      gap: 1rem;
      align-self: flex-start;

      .title {
        font-size: 1.563rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-btn {
        background-color: transparent;
      }
    }

    .body {
      height: 100%;
      max-height: 95vh;
      padding: 0rem 0.5rem 0.5rem 0.5rem;
      background-color: $background-color;
    }
  }
}
</style>
