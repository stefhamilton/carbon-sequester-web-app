import { createRouter, createWebHistory } from 'vue-router';
import SubmitProof from '../views/SubmitProof.vue';

const routes = [
  {
    path: '/',
    name: 'Submit Proof',
    component: SubmitProof,
  },
  {
    path: '/howto',
    name: 'How To',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/HowTo.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
