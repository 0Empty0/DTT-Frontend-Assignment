import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import FrontLayout from '@/components/layouts/FrontLayout.vue'

import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import ListingPage from '@/pages/ListingPage.vue'
import NewListingPage from '@/pages/NewListingPage.vue'
import EditListingPage from '@/pages/EditListingPage.vue'

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
    path: '/listing/:id',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Listing',
        component: ListingPage,
      },
    ],
  },
  {
    path: '/house/new',
    component: FrontLayout,
    children: [
      {
        path: '',
        name: 'HouseDetail',
        component: NewListingPage,
      },
    ],
  },
  {
    path: '/house/edit/:id',
    component: FrontLayout,
    children: [
      {
        path: '',
        name: 'HouseDetail',
        component: EditListingPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
