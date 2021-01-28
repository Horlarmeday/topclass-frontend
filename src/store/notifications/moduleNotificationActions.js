/*=========================================================================================
  File Name: moduleProductActions.js
  Description: Product Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  fetchNotifications({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/notifications/notifications', { params: { pageLimit: payload.pageLimit } })
        .then((response) => {
          commit('SET_NOTIFICATIONS', response.data.data.docs)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchNotificationsCount({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/notifications/count')
        .then((response) => {
          commit('SET_NOTIFICATIONS_TOTAL', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  readNotification({ commit }, notificationId) {
    return new Promise((resolve, reject) => {
      axios.put(`/notifications/read-notification`, notificationId)
        .then((response) => {
          commit('UPDATE_NOTIFICATION', response.data.data)
          commit('SET_NEW_TOTAL', 1)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
