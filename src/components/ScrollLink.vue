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
  <div
    v-ripple
    class="scroll-link"
    @click="scrollToElement(scrollTarget)"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.scroll-link {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0.5rem;
}
</style>
