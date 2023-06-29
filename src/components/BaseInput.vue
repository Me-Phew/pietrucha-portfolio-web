<script setup lang="ts">
export interface BaseInputProps {
  idAndName: string;
  autocomplete: string;
  placeholder: string;
  type?: string;
}

withDefaults(defineProps<BaseInputProps>(), {
  type: 'text',
});
</script>

<template>
  <input
    :type="type"
    class="text-input"
    :id="idAndName"
    :name="idAndName"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
  />
</template>

<style scoped lang="scss">
.text-input {
  height: 50px;
  width: 100%;
  background-color: $background-color;
  color: $text-color;
  outline: none;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  padding: 1rem;
  transition: border-color $transition-duration;

  &::placeholder {
    color: rgba(var(--text-color-rgb), 0.4);
  }

  &:focus {
    border-color: $text-color;
  }
}
</style>
