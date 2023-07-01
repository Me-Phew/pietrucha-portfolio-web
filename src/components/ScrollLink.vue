<script setup lang="ts">
interface ScrollLinkProps {
  scrollTarget: HTMLElement | null;
}

defineProps<ScrollLinkProps>();

const scrollToElement = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <a
    class="scroll-link"
    @click="scrollToElement(scrollTarget)"
  >
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.scroll-link {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
