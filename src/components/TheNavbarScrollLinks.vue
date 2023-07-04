<script setup lang="ts">
import ScrollLink from '@/components/ScrollLink.vue';
</script>

<template>
  <ul class="scroll-links">
    <li class="scroll-link-item">
      <ScrollLink scrollTarget="photos">Zdjęcia</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink scrollTarget="photo-shoots">Sesje zdjęciowe</ScrollLink>
    </li>
    <li class="scroll-link-item">
      <ScrollLink
        scrollTarget="footer"
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
