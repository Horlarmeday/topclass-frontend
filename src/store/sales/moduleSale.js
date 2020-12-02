/*=========================================================================================
  File Name: moduleSale.js
  Description: Sale Module
==========================================================================================*/


import state from './moduleSaleState.js'
import mutations from './moduleSaleMutations.js'
import actions from './moduleSaleActions.js'
import getters from './moduleSaleGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
