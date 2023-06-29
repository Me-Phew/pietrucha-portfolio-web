<script setup lang="ts"></script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped lang="scss">
.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 350px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: progress;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: loading 1.5s infinite;
    background: linear-gradient(
      90deg,
      rgba(33, 33, 33, 0),
      rgba(33, 33, 33, 0.3),
      rgba(33, 33, 33, 0)
    );
    transform: translate(-100%);
    z-index: 1;
  }
}

@keyframes loading {
  to {
    transform: translate(100%);
  }
}
</style>
