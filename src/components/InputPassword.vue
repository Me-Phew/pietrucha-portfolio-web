<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import type { BaseInputProps } from '@/components/BaseInput.vue';
import { ref, computed } from 'vue';
import { PhEye, PhEyeSlash } from '@phosphor-icons/vue';

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
    <PhEye
      size="28"
      class="icon"
      @click="togglePasswordVisibility"
      v-if="passwordVisible"
    />
    <PhEyeSlash
      size="28"
      class="icon"
      @click="togglePasswordVisibility"
      v-else
    />
  </div>
</template>

<style scoped lang="scss">
.password-input-wrapper {
  position: relative;
  width: 100%;

  .password-input:focus + .icon {
    color: $text-color;
  }

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5%;
    cursor: pointer;
    user-select: none;
    transition: color $transition-duration;
    color: rgba(var(--text-color-rgb), 0.4);

    &:hover,
    &:focus {
      color: $text-color;
    }
  }
}
</style>
