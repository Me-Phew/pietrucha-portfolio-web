<script setup lang="ts">
import { useHomePageSectionsStore } from '@/stores/homePageSections';
import { PhAperture } from '@phosphor-icons/vue';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';

const navbar = ref(null);

const homePageSectionsStore = useHomePageSectionsStore();

const scrollToSection = (section: HTMLElement | null) => {
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

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
      <p>Jakub "Pietrucha" Tokarczyk</p>
    </div>

    <ul class="scroll-links">
      <li
        class="scroll-link"
        @click="scrollToSection(homePageSectionsStore.photos)"
      >
        Photos
      </li>
      <li
        class="scroll-link"
        @click="scrollToSection(homePageSectionsStore.photoShoots)"
      >
        Photo shoots
      </li>
      <li
        class="scroll-link button-cta"
        @click="scrollToSection(homePageSectionsStore.footer)"
      >
        Contact
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.homepage-navigation {
  position: absolute;
  width: 100%;
  padding: 1rem 10vw;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  transform: translateY(-100%);

  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .scroll-links {
    list-style-type: none;
    display: flex;
    gap: 5rem;
    align-items: center;

    .scroll-link {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .button-cta {
      background-color: $primary-color;
      color: $background-color;
      border-radius: 0.5rem;
      font-weight: 600;
    }
  }
}
</style>
