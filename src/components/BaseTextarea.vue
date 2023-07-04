<script setup lang="ts">
import { computed, ref } from 'vue';

export interface BaseTextareaProps {
  placeholder: string;
  maxCharCount?: number;
}

withDefaults(defineProps<BaseTextareaProps>(), {
  maxCharCount: 300,
});

const message = ref('');
const currentCharCount = computed(() => message.value.length);
</script>

<template>
  <div class="textarea-wrapper">
    <textarea
      :placeholder="placeholder"
      v-model="message"
      :maxlength="maxCharCount"
      class="textarea-input"
    />
    <span class="word-count">{{ currentCharCount }} / {{ maxCharCount }}</span>
  </div>
</template>

<style scoped lang="scss">
.textarea-wrapper {
  position: relative;

  &,
  .textarea-input {
    width: 100%;
    color: $text-color;
    transition: border-color $transition-duration;

    &::placeholder {
      color: rgba(var(--text-color-rgb), 0.4);
    }

    &:hover,
    &:focus {
      border-color: rgba(var(--text-color-rgb), 0.8);

      .word-count {
        color: $text-color;
      }
    }

    &:focus {
      outline: none;
      + .word-count {
        color: $text-color;
      }
    }
  }
  .textarea-input {
    height: 300px;
    resize: none;
    border-color: rgba(var(--text-color-rgb), 0.4);
    background-color: transparent;
    padding: 1rem;
    border-radius: 0.375rem;
    font-size: 1.2rem;
  }

  .word-count {
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: rgba(var(--text-color-rgb), 0.5);
    transition: color $transition-duration;
  }
}
</style>
