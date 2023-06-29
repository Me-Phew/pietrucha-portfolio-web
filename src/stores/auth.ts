import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<string | null>(null);

  const isLoggedIn = computed(() => token.value != null);

  return {
    isLoggedIn,
  };
});
