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
      placeholder="Imię"
    />
    <MinimalisticInput
      idAndName="email"
      autocomplete="email"
      placeholder="Email"
    />

    <BaseTextarea placeholder="Twoja wiadomość" />

    <BaseFileUpload />

    <BaseButton
      type="submit"
      class="submit-button"
      >Wyślij wiadomość</BaseButton
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
  max-width: 30vw;

  .submit-button {
    align-self: center;
  }
}
</style>
