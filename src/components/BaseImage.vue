<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import BaseSkeleton from '@/components/BaseSkeleton.vue';
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

const modalOpen = ref(false);

const openModal = () => {
  modalOpen.value = true;
};
</script>

<template>
  <BaseSkeleton
    v-if="!imageLoaded"
    ref="visibilityTarget"
  />
  <img
    class="image"
    :src="src"
    alt=""
    loading="lazy"
    v-if="elementVisible || imageLoaded"
    @click="openModal"
    @load="setImageLoaded(true)"
  />

  <BaseModal
    v-model:open="modalOpen"
    fullscreen
  >
    <template #title>Lorem ipsum {{ new Date().toLocaleDateString() }}</template>

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
  object-fit: cover;
  border-radius: 0 0 0.5rem 0.5rem;
}
</style>

<style scoped lang="scss">
.image {
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  object-fit: cover;
}

.image:hover {
  transform: rotate(2deg) scale(1.4);
}
</style>
