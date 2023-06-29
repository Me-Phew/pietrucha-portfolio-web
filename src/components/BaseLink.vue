<script lang="ts">
export enum LinkTypes {
  External,
  Internal,
}
</script>

<script setup lang="ts">
import { logWarningPropValidationFailed } from '@/utils';

export interface BaseLinkProps {
  type?: LinkTypes;
  href?: string;
  routeName?: string;
}

const props = withDefaults(defineProps<BaseLinkProps>(), {
  type: LinkTypes.External,
});

const validateProps = () => {
  switch (props.type) {
    case LinkTypes.External: {
      if (props.href === undefined) {
        logWarningPropValidationFailed('External link requires a href value');
      }

      if (props.routeName != undefined) {
        logWarningPropValidationFailed('External link cannot have an internal route name value');
      }
      break;
    }

    case LinkTypes.Internal: {
      if (props.routeName === undefined) {
        logWarningPropValidationFailed('Internal link requires an internal route name value');
      }

      if (props.href != undefined) {
        logWarningPropValidationFailed('Internal link cannot have an external href value');
      }
      break;
    }
  }
};

validateProps();
</script>

<template>
  <li class="link-wrapper">
    <a
      :href="href"
      target="_blank"
      class="link"
      v-if="type === LinkTypes.External"
    >
      <slot name="icon"></slot>

      <span class="link-text"><slot></slot></span>
    </a>

    <router-link
      :to="{ name: routeName }"
      class="link"
      v-else
    >
      <slot name="icon"></slot>

      <span class="link-text"><slot></slot></span>
    </router-link>
  </li>
</template>

<style scoped lang="scss">
.link-wrapper {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  gap: 1rem;

  .link {
    display: flex;
    align-items: center;
    gap: inherit;
    cursor: pointer;

    &:hover .link-text {
      text-decoration: underline;
    }
  }
}
</style>
