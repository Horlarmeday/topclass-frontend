/*=========================================================================================
  File Name: store.js
  Description: Vuex store
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

import moduleAuth from './auth/moduleAuth.js'
import moduleEmployee from './employees/moduleEmployee.js'
import moduleCustomer from './customers/moduleCustomer.js'
import moduleUtility from './utilities/moduleUtility.js'
import moduleProduct from './products/moduleProduct.js'
import moduleService from './services/moduleService.js'
import moduleInvoice from './invoices/moduleInvoice.js'
import moduleSale from './sales/moduleSale.js'
import moduleSetting from './settings/moduleSetting.js'
import moduleWaybill from './waybills/moduleWaybill.js'
import moduleAsset from './assets/moduleAsset.js'
import moduleExpense from './expenses/moduleExpense.js'
import modulePayment from './payments/modulePayment.js'
import moduleNotification from './notifications/moduleNotification.js'

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    employee: moduleEmployee,
    customer: moduleCustomer,
    utilities: moduleUtility,
    product: moduleProduct,
    service: moduleService,
    invoice: moduleInvoice,
    sale: moduleSale,
    setting: moduleSetting,
    waybill: moduleWaybill,
    asset: moduleAsset,
    expense: moduleExpense,
    payment: modulePayment,
    notification: moduleNotification
  },
  strict: process.env.NODE_ENV !== 'production'
})
