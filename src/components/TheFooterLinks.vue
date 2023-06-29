<script setup lang="ts">
import BaseLink, { LinkTypes } from '@/components/BaseLink.vue';
import {
  PhAppWindow,
  PhCode,
  PhEnvelope,
  PhFacebookLogo,
  PhHeart,
  PhInstagramLogo,
} from '@phosphor-icons/vue';
</script>

<template>
  <ul class="links">
    <BaseLink href="https://www.facebook.com/kuba.tokarczyk.98">
      <template #icon>
        <PhFacebookLogo size="32" />
      </template>
      Kuba Tokarczyk
    </BaseLink>
    <BaseLink href="https://www.instagram.com/kuba_tokarczykf/">
      <template #icon>
        <PhInstagramLogo size="32" />
      </template>
      kuba_tokarczykf
    </BaseLink>
    <BaseLink href="mailto:kuba.tokarczyk@onet.eu">
      <template #icon>
        <PhEnvelope size="32" />
      </template>
      kuba.tokarczyk@onet.eu
    </BaseLink>
    <BaseLink href="https://github.com/Me-Phew">
      <template #icon>
        <PhCode size="32" />
      </template>
      Made with &nbsp;<PhHeart
        weight="fill"
        color="red"
      />&nbsp; by MePhew
    </BaseLink>
    <BaseLink
      :type="LinkTypes.Internal"
      routeName="adminDashboard"
    >
      <template #icon>
        <PhAppWindow size="32" />
      </template>
      Admin dashboard
    </BaseLink>
  </ul>
</template>

<style scoped lang="scss">
.links {
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
