<script setup lang="ts">
import BaseImage from '@/components/BaseImage.vue';
import { useElementSize } from '@vueuse/core';
import { watch } from 'vue';

import { ref } from 'vue';

const gallery = ref<HTMLElement | null>(null);

const { width: galleryWidth } = useElementSize(gallery);

watch(galleryWidth, (newGalleryWidth) => {
  loadGallery(newGalleryWidth);
});

const loadedObject = import.meta.glob('@/assets/photos/*.jpg');

const images = [...Object.keys(loadedObject)];

const columns = ref<Array<Array<string>>>([]);

const targetImageWidthWithoutGaps = 500;

const loadGallery = (width: number) => {
  if (width > 0) {
    let newNumberOfColumns = Math.round(galleryWidth.value / targetImageWidthWithoutGaps);

    newNumberOfColumns = newNumberOfColumns > 0 ? newNumberOfColumns : 1;

    if (columns.value.length != newNumberOfColumns) {
      const columnSize = Math.round(images.length / newNumberOfColumns);

      columns.value = [];

      let startIndex = 0;
      for (let i = 0; i < newNumberOfColumns; i++) {
        const column = images.slice(startIndex, startIndex + columnSize);
        columns.value.push(column);
        startIndex += columnSize;
      }
    }
  }
};
</script>

<template>
  <div
    class="gallery"
    ref="gallery"
  >
    <div class="columns-wrapper">
      <div
        class="column"
        v-for="(column, index) in columns"
        :key="index"
      >
        <div
          class="tile"
          v-for="(image, index) in column"
          :key="index"
        >
          <BaseImage
            :gallery="gallery!"
            :src="image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  width: 80vw;
  height: calc(88vh - 1rem);
  overflow-y: auto;
  padding: 0 1rem 0 1rem;

  .columns-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    .column {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: inherit;

      .tile {
        position: relative;
        min-height: 350px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
    }
  }
}
</style>
