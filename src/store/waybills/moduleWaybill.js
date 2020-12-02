/*=========================================================================================
  File Name: moduleWaybill.js
  Description: Waybill Module
==========================================================================================*/


import state from './moduleWaybillState.js'
import mutations from './moduleWaybillMutations.js'
import actions from './moduleWaybillActions.js'
import getters from './moduleWaybillGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
