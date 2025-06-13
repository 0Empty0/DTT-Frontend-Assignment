import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import FormLayout from '@/components/layouts/FormLayout.vue'

import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import HousePage from '@/pages/HousePage.vue'
import NewHousePage from '@/pages/NewHousePage.vue'
import EditHousePage from '@/pages/EditHousePage.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
      },
    ],
  },
  {
    path: '/about',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'About',
        component: AboutPage,
      },
    ],
  },
  {
    path: '/house/:id',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'House',
        component: HousePage,
      },
    ],
  },
  {
    path: '/listing/new',
    component: FormLayout,
    children: [
      {
        path: '',
        name: 'NewHouse',
        component: NewHousePage,
      },
    ],
  },
  {
    path: '/house/edit/:id',
    component: FormLayout,
    children: [
      {
        path: '',
        name: 'EditHouse',
        component: EditHousePage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
