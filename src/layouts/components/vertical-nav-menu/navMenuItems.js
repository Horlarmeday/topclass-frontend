/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
==========================================================================================*/


export default [
  {
    url: "/app/dashboard",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
  },
  {
    url: "/app/customers",
    name: "Customers",
    slug: "customers",
    icon: "UsersIcon",
  },
  {
    url: null,
    name: 'Inventory',
    icon: 'ServerIcon',
    i18n: 'Inventory',
    submenu: [
      {
        url: '/app/products',
        name: 'Products',
        slug: 'products',
        i18n: 'Products'
      },
      {
        url: '/app/services',
        name: 'Services',
        slug: 'services',
        i18n: 'Services'
      }
    ]
  },
  {
    url: "/app/invoices",
    name: "Invoice",
    slug: "invoice",
    icon: "InfoIcon",
  },
  {
    url: "/app/sales",
    name: "Sales",
    slug: "sales",
    icon: "FilterIcon",
  },
  {
    url: "/app/payments",
    name: "Payments",
    slug: "payments",
    icon: "BriefcaseIcon",
  },
  {
    url: "/app/employees",
    name: "Employees",
    slug: "employees",
    icon: "UserPlusIcon",
  },
  {
    url: null,
    name: 'Reports',
    icon: 'BarChartIcon',
    i18n: 'Reports',
    submenu: [
      {
        url: '/app/revenue-report',
        name: 'Revenue Report',
        slug: 'revenue',
        i18n: 'Revenue'
      },
      {
        url: '/app/expenses-report',
        name: 'Expenses Report',
        slug: 'expenses',
        i18n: 'Expenses'
      },
      {
        url: '/app/inventory-report',
        name: 'Inventory Report',
        slug: 'inventory',
        i18n: 'Inventory'
      },
    ]
  },
  {
    url: null,
    name: 'Expenditure',
    icon: 'CreditCardIcon',
    i18n: 'Expenditure',
    submenu: [
      {
        url: '/app/expenses',
        name: 'Expenses',
        slug: 'expenses',
        i18n: 'Expenses'
      },
      {
        url: '/app/assets',
        name: 'Assets',
        slug: 'assets',
        i18n: 'Assets'
      }
    ]
  },
  {
    url: "/app/settings",
    name: "Settings",
    slug: "settings",
    icon: "SettingsIcon",
  },
  {
    url: null,
    name: 'More',
    icon: 'PlusCircleIcon',
    i18n: 'More',
    submenu: [
      {
        url: '/app/units',
        name: 'Units',
        slug: 'units',
        i18n: 'Units'
      },
      {
        url: '/app/labels',
        name: 'Labels',
        slug: 'labels',
        i18n: 'Labels'
      },
      {
        url: '/app/defaults',
        name: 'Defaults',
        slug: 'defaults',
        i18n: 'Defaults'
      },
      {
        url: '/app/waybills',
        name: 'Waybill',
        slug: 'waybill',
        i18n: 'Waybill'
      },
    ]
  },
]
