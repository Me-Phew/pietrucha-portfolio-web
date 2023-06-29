<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { NScrollbar } from 'naive-ui';
import { nextTick, ref, watch } from 'vue';

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

const closeModal = () => {
  if (!closing.value) {
    deactivateModalFocus();
    closing.value = true;
    emit('update:open', false);
    setTimeout(() => {
      modalOpen.value = false;
      closing.value = false;
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
          <div class="header">
            <div class="title">
              <slot name="title" />
            </div>
            <PhX
              class="close-icon"
              size="34"
              v-if="!persistent"
              @click="closeModal"
              @keyup.enter="closeModal"
            />
          </div>
          <div
            class="body"
            v-if="fullscreen"
          >
            <slot />
          </div>
          <div
            class="body"
            v-else
          >
            <n-scrollbar trigger="none">
              <slot />
            </n-scrollbar>
          </div>
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

      .body {
        padding: 0;
        object-fit: cover;
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
    grid-template-rows: auto auto;

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
      display: grid;
      grid-template-columns: auto 34px;
      justify-items: center;
      align-items: center;
      padding: 0.5rem 1rem;
      gap: 1rem;
      align-self: flex-start;

      .title {
        font-size: 1.563rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-icon {
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(var(--secondary-color), 0.6);
        transition: color $transition-duration;

        &:hover {
          color: rgba(var(--secondary-color), 1);
        }
      }
    }

    .body {
      padding: 0.5rem;
      height: 88vh;
      background-color: $background-color;
    }
  }
}
</style>
