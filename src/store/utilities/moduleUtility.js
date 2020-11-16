/*=========================================================================================
  File Name: moduleUtility.js
  Description: Utility Module
==========================================================================================*/


import state from './moduleUtilityState.js'
import mutations from './moduleUtilityMutations.js'
import actions from './moduleUtilityActions.js'
import getters from './moduleUtilityGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
