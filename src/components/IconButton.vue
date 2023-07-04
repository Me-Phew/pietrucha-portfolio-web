<script lang="ts">
export enum TooltipPosition {
  bottom,
  top,
}
</script>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';

export interface IconButtonProps {
  tooltipPosition?: TooltipPosition;
}

withDefaults(defineProps<IconButtonProps>(), {
  tooltipPosition: TooltipPosition.bottom,
});
</script>

<template>
  <BaseButton
    type="button"
    class="icon-button"
  >
    <slot></slot>

    <div
      class="tooltip"
      :class="{
        bottom: tooltipPosition === TooltipPosition.bottom,
        top: tooltipPosition === TooltipPosition.top,
      }"
    >
      <slot name="tooltip-text"></slot>
    </div>
  </BaseButton>
</template>

<style scoped lang="scss">
.icon-button {
  min-width: auto;
  height: auto;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.7);
  transition: color $transition-duration;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  :slotted(*) {
    transition: color $transition-duration;
  }

  &:hover {
    color: $text-color;

    .tooltip {
      transform: translateX(-50%) scale(1) translateZ(0);
      opacity: 1;
    }
  }

  .tooltip {
    &.top {
      bottom: 100%;
      margin-bottom: 0.5rem;
    }

    &.bottom {
      top: 100%;
      margin-top: 0.5rem;
    }

    background-color: rgba(0, 0, 0, 0.8);
    opacity: 0;
    position: absolute;
    padding: 0.5rem;
    min-height: 20px;
    font-size: 0.75rem;
    border-radius: 0.375rem;
    left: 50%;
    transform: translateX(-50%) scale(0.5) translateZ(0);
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    z-index: 10000;
    transition: transform $transition-duration, opacity $transition-duration;
    transition-delay: 0.5s;
    pointer-events: none;
    user-select: none;
  }
}
</style>
