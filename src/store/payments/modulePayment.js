/*=========================================================================================
  File Name: modulePayment.js
  Description: Payment Module
==========================================================================================*/


import state from './modulePaymentState'
import mutations from './modulePaymentMutations.js'
import actions from './modulePaymentActions.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
