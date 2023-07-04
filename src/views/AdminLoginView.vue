<template>
  <div class="login-page">
    <div class="login-form-wrapper">
      <p class="title">Panel administracyjny</p>
      <form
        @submit.prevent
        class="login-form"
      >
        <BaseInput
          idAndName="username"
          autocomplete="username"
          placeholder="Nazwa użytkownika"
        />
        <InputPassword
          idAndName="currentPassword"
          autocomplete="current-password"
          placeholder="Hasło"
        />
        <BaseButton
          type="submit"
          class="login-button"
          >Zaloguj się</BaseButton
        >
      </form>
      <router-link
        :to="{ name: 'home' }"
        class="link-back-to-homepage"
        >Powrót do strony głównej</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import InputPassword from '@/components/InputPassword.vue';
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  padding: 1rem;

  &,
  .login-form-wrapper,
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .login-form-wrapper {
    background-color: rgba(var(--text-color-rgb), 0.05);
    padding: 2rem;
    border-radius: 0.375rem;
    box-shadow: 0 0 8px -2px rgba(var(--text-color-rgb), 0.1);
    gap: 2rem;
    max-width: 400px;

    .title {
      font-size: clamp(1.4rem, 5vw, 1.6rem);
      font-weight: 600;
    }

    .login-form {
      width: 100%;
      gap: 2rem;

      .login-button {
        width: 100%;
      }
    }

    .link-back-to-homepage {
      color: $text-color;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
