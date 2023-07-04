<script setup lang="ts">
defineProps({
  scrollTarget: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <a
    v-ripple
    class="scroll-link"
    :href="`#${scrollTarget}`"
  >
    <slot></slot>
  </a>
</template>

<style scoped lang="scss">
.scroll-link {
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0.5rem;
  color: $text-color;
}
</style>
