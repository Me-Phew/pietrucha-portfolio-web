<script setup lang="ts">
import { printCreatorMessage } from '@/utils';
import type { GlobalThemeOverrides } from 'naive-ui';
import { NConfigProvider } from 'naive-ui';
import { RouterView } from 'vue-router';

printCreatorMessage();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(var(--primary-color-rgb))',
  },
};
</script>

<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <RouterView />
  </NConfigProvider>
</template>

<style scoped lang="scss"></style>
