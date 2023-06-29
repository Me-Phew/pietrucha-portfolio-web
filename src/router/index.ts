import { useAuthStore } from '@/stores/auth';
import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin-login',
      name: 'adminLogin',
      component: () => import('@/views/AdminLoginView.vue'),
    },
    {
      path: '/admin-dashboard',
      name: 'adminDashboard',
      component: () => import('@/views/AdminDashboardView.vue'),
      beforeEnter: () => {
        const authStore = useAuthStore();

        if (!authStore.isLoggedIn) {
          return { name: 'adminLogin' };
        }
      },
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: () => import('@/views/PageNotFoundView.vue'),
    },
  ],
});

export default router;
