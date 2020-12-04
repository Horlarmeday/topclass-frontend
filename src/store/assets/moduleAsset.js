/*=========================================================================================
  File Name: moduleAsset.js
  Description: Asset Module
==========================================================================================*/


import state from './moduleAssetState.js'
import mutations from './moduleAssetMutations.js'
import actions from './moduleAssetActions.js'
import getters from './moduleAssetGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
