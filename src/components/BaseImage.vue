<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import BaseSkeleton from '@/components/BaseSkeleton.vue';
import { PhImage, PhSealWarning } from '@phosphor-icons/vue';
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  gallery: {
    type: HTMLElement,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  srcSet: {
    type: Array<String>,
    // required: true,
  },
  alt: {
    type: String,
    // required: true,
  },
});

const visibilityTarget = ref(null);

const elementVisible = ref(false);

useIntersectionObserver(
  visibilityTarget,
  ([{ isIntersecting }]) => {
    elementVisible.value = isIntersecting;
  },
  {
    root: props.gallery,
    threshold: 0,
  },
);

const imageLoaded = ref(false);
const setImageLoaded = (value: boolean) => {
  imageLoaded.value = value;
};

const loadingFailed = ref<boolean>(false);

const handleLoadingError = () => {
  loadingFailed.value = true;
};

const modalOpen = ref(false);

const openModal = () => {
  modalOpen.value = true;
};
</script>

<template>
  <BaseSkeleton
    v-if="!imageLoaded && !loadingFailed"
    ref="visibilityTarget"
  />
  <div
    class="loading-failed-wrapper"
    v-else-if="loadingFailed"
  >
    <p class="loading-failed-message">Nie udało się załadować zdjęcia</p>
    <div class="icon-wrapper">
      <PhImage
        size="128"
        class="image-icon"
      />
      <PhSealWarning
        size="64"
        class="error-icon"
        weight="bold"
      />
    </div>
  </div>
  <img
    class="image"
    :src="src"
    alt=""
    loading="lazy"
    v-if="(elementVisible || imageLoaded) && !loadingFailed"
    @click="openModal"
    @load="setImageLoaded(true)"
    @error="handleLoadingError"
  />

  <BaseModal
    v-model:open="modalOpen"
    fullscreen
    v-if="(elementVisible || imageLoaded) && !loadingFailed"
  >
    <img
      :src="src"
      srcset=""
      :alt="alt"
      loading="lazy"
      class="full-size-image"
    />
  </BaseModal>
</template>

<style lang="scss">
.full-size-image {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
}
</style>

<style scoped lang="scss">
.image {
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  object-fit: cover;

  &:hover {
    transform: rotate(2deg) scale(1.4);
  }
}

.loading-failed-wrapper {
  height: 100%;
  width: 100%;
  background-color: rgba(138, 40, 40, 0.226);
  color: rgb(218, 14, 14);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .loading-failed-message {
    font-size: 1.4rem;
    font-weight: bold;
  }

  .icon-wrapper {
    position: relative;

    .error-icon {
      position: absolute;
      top: 0;
      right: 0;
      color: rgb(218, 14, 14);
    }

    .image-icon {
      color: rgb(128, 33, 33);
    }
  }
}
</style>
