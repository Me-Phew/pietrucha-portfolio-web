<template>
  <button
    v-ripple
    class="button"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes, PropType } from 'vue';

defineProps({
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.button {
  height: 40px;
  max-width: 400px;
  min-width: 100px;
  background-color: $text-color;
  color: $background-color;
  outline: none;
  border-radius: 0.375rem;
  padding: 0 1rem;
  font-weight: bold;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
