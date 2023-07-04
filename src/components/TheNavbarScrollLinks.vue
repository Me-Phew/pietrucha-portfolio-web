<script setup lang="ts">
import ScrollLink from '@/components/ScrollLink.vue';
import { useHomePageSectionsStore } from '@/stores/homePageSections';

const homePageSectionsStore = useHomePageSectionsStore();
</script>

<template>
  <ul class="scroll-links">
    <li class="scroll-link-item">
      <ScrollLink :scrollTarget="homePageSectionsStore.photos">Zdjęcia</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink :scrollTarget="homePageSectionsStore.photoShoots">Sesje zdjęciowe</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink
        :scrollTarget="homePageSectionsStore.footer"
        class="cta-link"
        >Kontakt</ScrollLink
      >
    </li>
  </ul>
</template>

<style scoped lang="scss">
.scroll-links {
  list-style-type: none;
  display: flex;
  gap: 5rem;
  align-items: center;
  text-transform: uppercase;

  .cta-link {
    background-color: $text-color;
    color: $background-color;
  }
}
</style>
