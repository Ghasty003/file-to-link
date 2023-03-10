import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/image/:id',
    name: 'about',
    component: () => import('../views/ImageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === "about" && !store.state.isLinkValid) {
    return next("/");
  }
  next();
})

export default router
