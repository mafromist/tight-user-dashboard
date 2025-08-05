import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import UserDetailsPage from '@/views/UserDetailsPage.vue'
import NotFound from '@/views/NotFound.vue'

const supportedLocales = ['en', 'tr', 'de']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const stored = sessionStorage.getItem('app-locale')
        const short = stored?.split('-')[0]
        return supportedLocales.includes(short) ? `/${short}/dashboard` : '/en/dashboard'
      },
    },
    { path: '/:locale', redirect: '/:locale/dashboard' },
    {
      path: '/:locale/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/:locale/user-details/:id',
      name: 'UserDetails',
      component: UserDetailsPage,
      props: true,
      meta: { title: 'User Details' },
    },
    {
      path: '/:locale/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { title: 'Page Not Found' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta?.title ? `TightUser - ${to.meta?.title}` : 'My App'
  if (typeof document !== 'undefined') {
    document.title = title
  }
})

export default router
