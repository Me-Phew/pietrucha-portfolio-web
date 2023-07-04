<script setup lang="ts">
import { reactive } from 'vue';

const photoShootData = reactive({
  date: new Date().toLocaleDateString(),
  name: 'No name',
});
</script>

<template>
  <div class="photo-shoots-wrapper">
    <div class="photo-shoots">
      <div class="photo-shoot"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo-shoots-wrapper {
  padding: 1rem 0;

  .photo-shoots {
    .photo-shoot {
    }
  }
}
</style>
