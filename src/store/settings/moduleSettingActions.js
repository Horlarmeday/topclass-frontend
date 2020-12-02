/*=========================================================================================
  File Name: moduleServiceActions.js
  Description: Service Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addSetting({ commit }, setting) {
    return new Promise((resolve, reject) => {
      axios.post('/utilities/settings/create', setting)
        .then((response) => {
          commit('ADD_SETTING',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchSettings ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/utilities/settings', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter } })
        .then((response) => {
          commit('SET_SETTINGS', response.data.data.docs)
          commit('SET_SETTINGS_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateSetting ({ commit }, setting) {
    return new Promise((resolve, reject) => {
      axios.put(`/utilities/settings`, setting)
        .then((response) => {
          commit('UPDATE_SETTING', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
