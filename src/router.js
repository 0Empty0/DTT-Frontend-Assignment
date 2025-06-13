import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import FormLayout from '@/components/layouts/FormLayout.vue'

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
    path: '/listing/new',
    component: FormLayout,
    children: [
      {
        path: '',
        name: 'NewListing',
        component: NewListingPage,
      },
    ],
  },
  {
    path: '/listing/edit/:id',
    component: FormLayout,
    children: [
      {
        path: '',
        name: 'EditListing',
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
