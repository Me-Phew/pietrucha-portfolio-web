<script setup lang="ts">
import { printCreatorMessage } from '@/utils';
import type { GlobalThemeOverrides } from 'naive-ui';
import { NConfigProvider, NScrollbar } from 'naive-ui';
import { RouterView } from 'vue-router';

printCreatorMessage();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(var(--primary-color-rgb))',
  },
  Scrollbar: {
    color: 'rgba(var(--secondary-color-rgb), .4)',
    colorHover: 'rgba(var(--secondary-color-rgb), 1)',
  },
};
</script>

<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <div class="app-wrapper">
      <NScrollbar trigger="none">
        <RouterView />
      </NScrollbar>
    </div>
  </NConfigProvider>
</template>

<style lang="scss">
.app-wrapper {
  height: 100vh;

  .n-scrollbar-container {
    scroll-behavior: smooth;

    .n-scrollbar-content {
      position: relative;
    }
  }

  .n-scrollbar-rail__scrollbar {
    z-index: 10000;
  }
}
</style>
