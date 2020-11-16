/*=========================================================================================
  File Name: moduleService.js
  Description: Service Module
==========================================================================================*/


import state from './moduleServiceState.js'
import mutations from './moduleServiceMutations.js'
import actions from './moduleServiceActions.js'
import getters from './moduleServiceGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
