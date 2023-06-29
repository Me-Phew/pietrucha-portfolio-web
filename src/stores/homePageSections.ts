import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomePageSectionsStore = defineStore('homePageSections', () => {
  const photos = ref<HTMLElement | null>(null);
  const photoShoots = ref<HTMLElement | null>(null);
  const footer = ref<HTMLElement | null>(null);

  return {
    photos,
    photoShoots,
    footer,
  };
});
