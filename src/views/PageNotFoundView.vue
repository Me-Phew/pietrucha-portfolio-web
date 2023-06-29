<script setup lang="ts">
import BaseLink, { LinkTypes } from '@/components/BaseLink.vue';
import { PhArrowLeft } from '@phosphor-icons/vue';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
import moon from '/photos/IMG_0215-2.jpg';

const moonPhoto = ref<HTMLElement | null>(null);
const infoWrapper = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.fromTo(
    moonPhoto.value,
    { x: '-100%', scale: 1 },
    { x: '0%', scale: 4, duration: 0.8, ease: 'none' },
  );
  gsap.fromTo(infoWrapper.value, { x: '100%' }, { x: '0%', duration: 0.8, ease: 'none' });
});
</script>

<template>
  <div class="page-not-found">
    <div class="photo-wrapper">
      <img
        :src="moon"
        alt=""
        class="moon-photo"
        ref="moonPhoto"
      />
    </div>
    <div class="info-wrapper">
      <div
        class="animation-wrapper"
        ref="infoWrapper"
      >
        <div class="not-found">
          <p class="huge">404</p>
          <p class="big">not found</p>
        </div>
        <p class="info-text">
          This page (probably) doesn't exist even in the vastness of outer space
        </p>
        <BaseLink
          :type="LinkTypes.Internal"
          routeName="home"
        >
          <template #icon><ph-arrow-left :size="32" /></template>
          Back to homepage</BaseLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-not-found {
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;

  .photo-wrapper {
    overflow: hidden;
    position: relative;
    background-color: #010101;

    .moon-photo {
      position: absolute;
      transform: translateX(-100%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .animation-wrapper {
      width: 100%;
      transform: translateX(100%);
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      .not-found {
        display: flex;
        flex-direction: column;
        align-items: center;
        .huge {
          font-size: 10rem;
          font-weight: 800;
        }

        .big {
          font-size: 5rem;
          text-transform: uppercase;
        }
      }

      .info-text {
        font-size: 1.4rem;
        font-weight: 600;
      }
    }
  }
}
</style>
