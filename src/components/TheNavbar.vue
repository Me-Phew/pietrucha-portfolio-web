<script setup lang="ts">
import TheNavbarScrollLinks from '@/components/TheNavbarScrollLinks.vue';
import { PhAperture } from '@phosphor-icons/vue';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';

const navbar = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.fromTo(navbar.value, { y: '-100%' }, { y: '0%', duration: 1, ease: 'none' });
});
</script>

<template>
  <nav
    ref="navbar"
    class="homepage-navigation"
  >
    <div class="logo">
      <ph-aperture
        :size="60"
        color="var(--text-color)"
      />
      <p class="text">Jakub "Pietrucha" Tokarczyk</p>
    </div>

    <TheNavbarScrollLinks />
  </nav>
</template>

<style lang="scss" scoped>
.homepage-navigation {
  position: absolute;
  width: 100%;
  padding: 1rem 10vw;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  transform: translateY(-100%);

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .text {
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
}
</style>
