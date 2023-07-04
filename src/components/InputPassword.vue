<script setup lang="ts">
import type { BaseInputProps } from '@/components/BaseInput.vue';
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue';
import { computed, ref } from 'vue';

interface InputPasswordProps extends Omit<BaseInputProps, 'type'> {}

defineProps<InputPasswordProps>();

const passwordVisible = ref(false);

const currentInputType = computed(() => {
  if (passwordVisible.value) {
    return 'text';
  }

  return 'password';
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div class="password-input-wrapper">
    <BaseInput
      :idAndName="idAndName"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :type="currentInputType"
      class="password-input"
    />
    <IconButton
      class="toggle-password-visibilit-button"
      @click="togglePasswordVisibility"
    >
      <PhEye
        size="28"
        v-if="passwordVisible"
      />
      <PhEyeSlash
        size="28"
        v-else
      />
      <template
        #tooltip-text
        v-if="passwordVisible"
      >
        <span>Ukryj hasło</span>
      </template>

      <template
        #tooltip-text
        v-else
      >
        <span>Pokaż hasło</span>
      </template>
    </IconButton>
  </div>
</template>

<style scoped lang="scss">
.password-input-wrapper {
  position: relative;
  width: 100%;

  .password-input:focus + .icon {
    color: $text-color;
  }

  .toggle-password-visibilit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
    background-color: transparent;
  }
}
</style>
