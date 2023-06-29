<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import type { BaseInputProps } from '@/components/BaseInput.vue';

defineProps<BaseInputProps>();
</script>

<template>
  <BaseInput
    :idAndName="idAndName"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :type="type"
    class="minimalistic-input"
  />
</template>

<style scoped lang="scss">
.minimalistic-input {
  background-color: none;
  border-radius: 0;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: rgba(var(--text-color-rgb), 0.4);
  font-size: 1.2rem;
  padding: 0;
  transition: border-color $transition-duration;

  &:hover,
  &:focus {
    border-color: rgba(var(--text-color-rgb), 0.8);

    .word-count {
      color: $text-color;
    }
  }
}
</style>
