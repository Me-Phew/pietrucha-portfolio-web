<template>
  <div class="login-page">
    <div class="login-form-wrapper">
      <p class="title">Admin dashboard login</p>
      <form
        @submit.prevent
        class="login-form"
      >
        <BaseInput
          idAndName="username"
          autocomplete="username"
          placeholder="Username"
        />
        <InputPassword
          idAndName="currentPassword"
          autocomplete="current-password"
          placeholder="Password"
        />
        <BaseButton
          type="submit"
          class="login-button"
          >Login</BaseButton
        >
      </form>
      <router-link
        :to="{ name: 'home' }"
        class="link-back-to-homepage"
        >Back to homepage</router-link
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

    .title {
      font-size: 1.6rem;
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
