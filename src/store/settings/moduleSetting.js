/*=========================================================================================
  File Name: moduleSetting.js
  Description: Setting Module
==========================================================================================*/


import state from './moduleSettingState.js'
import mutations from './moduleSettingMutations.js'
import actions from './moduleSettingActions.js'
import getters from './moduleSettingGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
