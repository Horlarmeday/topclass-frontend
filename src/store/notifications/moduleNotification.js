/*=========================================================================================
  File Name: moduleNotification.js
  Description: Notification Module
==========================================================================================*/


import state from './moduleNotificationState'
import mutations from './moduleNotificationMutations.js'
import actions from './moduleNotificationActions.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
