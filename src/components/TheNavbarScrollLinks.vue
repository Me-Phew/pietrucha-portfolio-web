<script setup lang="ts">
import ScrollLink from '@/components/ScrollLink.vue';
import { useHomePageSectionsStore } from '@/stores/homePageSections';

const homePageSectionsStore = useHomePageSectionsStore();
</script>

<template>
  <ul class="scroll-links">
    <li class="scroll-link-item">
      <ScrollLink :scrollTarget="homePageSectionsStore.photos">Photos</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink :scrollTarget="homePageSectionsStore.photoShoots">Photo shoots</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink
        :scrollTarget="homePageSectionsStore.footer"
        class="cta-link"
        >Contact</ScrollLink
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

  .cta-link {
    background-color: $primary-color;
    color: $background-color;
    border-radius: 0.5rem;
    font-weight: 600;
  }
}
</style>
