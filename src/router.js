/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from './store/auth/moduleAuth'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/',
        redirect: '/auth/login'
      },

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/app/dashboard',
                name: 'dashboard',
                component: () => import('./views/pages/app/home/Dashboard.vue'),
                meta: {
                  requiresAuth: true
                }
              },
              {
                path: '/app/customers',
                name: 'customers',
                component: () => import('./views/pages/app/customers/CustomersList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Customers',
                }
              },
              {
                path: '/app/employees',
                name: 'employees',
                component: () => import('./views/pages/app/employees/EmployeeList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Employees',
                }
              },
              {
                path: '/app/units',
                name: 'units',
                component: () => import('./views/pages/app/utilities/UnitList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Units',
                }
              },
              {
                path: '/app/labels',
                name: 'labels',
                component: () => import('./views/pages/app/utilities/LabelList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Labels',
                }
              },
              {
                path: '/app/products',
                name: 'products',
                component: () => import('./views/pages/app/products/ProductsList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Products',
                }
              },
              {
                path: '/app/services',
                name: 'services',
                component: () => import('./views/pages/app/services/ServicesList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Services',
                }
              },
              {
                path: '/app/invoices',
                name: 'invoices',
                component: () => import('./views/pages/app/invoices/InvoiceList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Invoices',
                }
              },
              {
                path: '/app/invoice/:invoiceId',
                name: 'invoiceparam',
                component: () => import('./views/pages/app/invoices/ViewInvoice.vue'),
                meta: {
                  requiresAuth: true,
                }
              },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/auth/login',
                name: 'page-login',
                component: () => import('@/views/auth/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token) {
      next()
      return
    }
    next('/auth/login')
  } else {
    next()
  }
})

export default router
