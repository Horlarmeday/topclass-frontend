/*=========================================================================================
  File Name: moduleProduct.js
  Description: Product Module
==========================================================================================*/


import state from './moduleProductState.js'
import mutations from './moduleProductMutations.js'
import actions from './moduleProductActions.js'
import getters from './moduleProductGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
