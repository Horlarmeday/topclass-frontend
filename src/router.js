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
                  rule: 'Public',
                  requiresAuth: true
                }
              },
              {
                path: '/app/customers',
                name: 'customers',
                component: () => import('./views/pages/app/customers/CustomersList.vue'),
                meta: {
                  rule: 'Secretary',
                  requiresAuth: true,
                  pageTitle: 'Customers',
                }
              },
              {
                path: '/app/customer/:customerId',
                name: 'customerparam',
                component: () => import('./views/pages/app/customers/ViewCustomer.vue'),
                meta: {
                  rule: 'Secretary',
                  requiresAuth: true,
                  pageTitle: 'Customer',
                }
              },
              {
                path: '/app/employees',
                name: 'employees',
                component: () => import('./views/pages/app/employees/EmployeeList.vue'),
                meta: {
                  rule: 'SuperAdmin',
                  requiresAuth: true,
                  pageTitle: 'Employees',
                }
              },
              {
                path: '/app/employee/:staffId',
                name: 'employeeparam',
                component: () => import('./views/pages/app/employees/ViewEmployee.vue'),
                meta: {
                  rule: 'SuperAdmin',
                  requiresAuth: true,
                  pageTitle: 'Employee',
                }
              },
              {
                path: '/app/units',
                name: 'units',
                component: () => import('./views/pages/app/utilities/UnitList.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Units',
                }
              },
              {
                path: '/app/labels',
                name: 'labels',
                component: () => import('./views/pages/app/utilities/LabelList.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Labels',
                }
              },
              {
                path: '/app/products',
                name: 'products',
                component: () => import('./views/pages/app/products/ProductsList.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Products',
                }
              },
              {
                path: '/app/products/:productId',
                name: 'oneproduct',
                component: () => import('./views/pages/app/products/ViewProduct.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Products',
                }
              },
              {
                path: '/app/services',
                name: 'services',
                component: () => import('./views/pages/app/services/ServicesList.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Services',
                }
              },
              {
                path: '/app/invoices',
                name: 'invoices',
                component: () => import('./views/pages/app/invoices/InvoiceList.vue'),
                meta: {
                  rule: 'Secretary',
                  requiresAuth: true,
                  pageTitle: 'Invoices',
                }
              },
              {
                path: '/app/invoice/:invoiceId',
                name: 'invoiceparam',
                component: () => import('./views/pages/app/invoices/ViewInvoice.vue'),
                meta: {
                  rule: 'Public',
                  requiresAuth: true,
                }
              },
              {
                path: '/app/defaults',
                name: 'defaults',
                component: () => import('./views/pages/app/utilities/DefaultList.vue'),
                meta: {
                  rule: 'Workshop',
                  requiresAuth: true,
                  pageTitle: 'Default Items',
                }
              },
              {
                path: '/app/sales',
                name: 'sales',
                component: () => import('./views/pages/app/sales/SalesList.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Sales',
                }
              },
              {
                path: '/app/sale/:saleId',
                name: 'salesparam',
                component: () => import('./views/pages/app/sales/ViewSale.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Sale View',
                }
              },
              {
                path: '/app/sale/:saleId/receipt',
                name: 'salesparamreceipt',
                component: () => import('./views/pages/app/sales/ViewReceipt.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                }
              },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
              {
                path: '/pages/not-authorized',
                name: 'page-not-authorized',
                component: () => import('@/views/pages/NotAuthorized.vue'),
                meta: {
                  rule: 'Public',
                  requiresAuth: true
                }
              },
              {
                path: '/app/settings',
                name: 'settings',
                component: () => import('./views/pages/app/settings/Setting.vue'),
                meta: {
                  rule: 'Public',
                  requiresAuth: true,
                  pageTitle: 'Settings',
                }
              },
              {
                path: '/app/waybills',
                name: 'waybills',
                component: () => import('./views/pages/app/waybills/WaybillList.vue'),
                meta: {
                  rule: 'Workshop',
                  requiresAuth: true,
                  pageTitle: 'Waybills',
                }
              },
              {
                path: '/app/waybill/:waybillId',
                name: 'waybillparam',
                component: () => import('./views/pages/app/waybills/ViewWaybill.vue'),
                meta: {
                  rule: 'Workshop',
                  requiresAuth: true,
                }
              },
              {
                path: '/app/assets',
                name: 'assets',
                component: () => import('./views/pages/app/assets/AssetList.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Assets',
                }
              },
              {
                path: '/app/expenses',
                name: 'expenses',
                component: () => import('./views/pages/app/expenses/ExpensesList.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Expenses',
                }
              },
              {
                path: '/app/payments',
                name: 'payments',
                component: () => import('./views/pages/app/payments/PaymentList.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Payments',
                }
              },
              {
                path: '/app/revenue-report',
                name: 'revenuereport',
                component: () => import('./views/pages/app/reports/RevenueReport.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Revenue Report',
                }
              },
              {
                path: '/app/expenses-report',
                name: 'expensesreport',
                component: () => import('./views/pages/app/reports/ExpensesReport.vue'),
                meta: {
                  rule: 'Accountant',
                  requiresAuth: true,
                  pageTitle: 'Expenses Report',
                }
              },
              {
                path: '/app/inventory-report',
                name: 'inventoryreport',
                component: () => import('./views/pages/app/reports/InventoryReport.vue'),
                meta: {
                  rule: 'Store',
                  requiresAuth: true,
                  pageTitle: 'Inventory Report',
                }
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
                component: () => import('@/views/auth/Login.vue'),
                meta: {
                  rule: 'Public',
                }
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue'),
                meta: {
                  rule: 'Public',
                }
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
