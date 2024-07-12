import { createRouter, createWebHistory } from 'vue-router';
import Books from '../components/Books.vue';
import SearchBooks from '../components/SearchBooks.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books,
    },
    {
      path: '/search',
      name: 'SearchBooks',
      component: SearchBooks,
    },
  ]
});

export default router;
