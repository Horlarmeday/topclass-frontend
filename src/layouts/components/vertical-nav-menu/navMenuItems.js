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
    url: "/app/employees",
    name: "Employees",
    slug: "employees",
    icon: "UserPlusIcon",
  },
  {
    url: "/app/reports",
    name: "Reports",
    slug: "reports",
    icon: "BarChartIcon",
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
