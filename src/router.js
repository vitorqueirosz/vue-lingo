import { createRouter, createWebHistory } from 'vue-router';
import { PATHS } from './constants/path';
import Home from './pages/Home.vue';
import Lessons from './pages/Lessons.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: PATHS.HOME,
      component: Home,
    },
    {
      path: PATHS.LESSONS,
      component: Lessons,
    },
  ],
});
