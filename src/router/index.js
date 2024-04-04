import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InGameView from '../views/InGameView.vue'
import UnsupportedView from '../views/UnsupportedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/start',
      name: 'InGameView',
      component: InGameView
    },
    {
      path: '/unsupported',
      name: 'UnsupportedView',
      component: UnsupportedView
    }
  ]
})

export default router
