<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import TheHeroSection from '@/components/TheHeroSection.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import ThePhotoShootsSection from '@/components/ThePhotoShootsSection.vue';
import ThePhotosSection from '@/components/ThePhotosSection.vue';
</script>

<template>
  <div class="page home-page">
    <header>
      <TheNavbar />
    </header>
    <main>
      <TheHeroSection />
      <ThePhotosSection ref="photosSection" />
      <ThePhotoShootsSection />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped lang="scss"></style>
