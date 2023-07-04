<script setup lang="ts">
import TheContactForm from '@/components/TheContactForm.vue';
import TheFooterLinks from '@/components/TheFooterLinks.vue';
</script>

<template>
  <footer
    class="homepage-footer"
    id="footer"
  >
    <div class="contact">
      <TheContactForm />
      <TheFooterLinks />
    </div>

    <div class="legal">
      <span>© {{ new Date().getFullYear() }} Wszelkie prawa zastrzeżone</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.homepage-footer {
  width: 100%;
  padding: 1rem 10vw 5vh 10vw;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .contact {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid rgba(var(--text-color-rgb), 0.4);
    padding-bottom: 5vh;
  }

  .legal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
