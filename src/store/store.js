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
    invoice: moduleInvoice
  },
  strict: process.env.NODE_ENV !== 'production'
})
