<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseFileUpload from '@/components/BaseFileUpload.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import MinimalisticInput from '@/components/MinimalisticInput.vue';
</script>

<template>
  <form
    @submit.prevent
    class="contact-form"
  >
    <MinimalisticInput
      idAndName="name"
      autocomplete="given-name"
      placeholder="Name"
    />
    <MinimalisticInput
      idAndName="email"
      autocomplete="email"
      placeholder="Email"
    />

    <BaseTextarea placeholder="Tell me whatever you need" />

    <BaseFileUpload />

    <BaseButton
      type="submit"
      class="submit-button"
      >Send message</BaseButton
    >
  </form>
</template>

<style scoped lang="scss">
.contact-form {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
}

.input-font-medium {
  font-size: 1.2rem;
}

.textarea-wrapper {
  position: relative;

  .word-count {
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: rgba(var(--text-color-rgb), 0.5);
    transition: color $transition-duration;
  }
}

.textarea-input,
.textarea-wrapper {
  width: 100%;
  color: $text-color;
  transition: border-color $transition-duration;

  &:hover,
  &:focus {
    border-color: rgba(var(--text-color-rgb), 0.8);

    .word-count {
      color: $text-color;
    }
  }

  &:focus {
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
}

.submit-button {
  align-self: center;
}
</style>
