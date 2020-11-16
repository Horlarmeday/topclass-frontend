/*=========================================================================================
  File Name: moduleServiceActions.js
  Description: Service Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addService({ commit }, service) {
    return new Promise((resolve, reject) => {
      axios.post('/services/create', service)
        .then((response) => {
          commit('ADD_SERVICE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchServices ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/services', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter } })
        .then((response) => {
          commit('SET_SERVICES', response.data.data.docs)
          commit('SET_SERVICES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchParamService({ commit }, serviceId) {
    return new Promise((resolve, reject) => {
      axios.get(`/services/${serviceId}`)
        .then((response) => {
          commit('SET_SERVICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateService ({ commit }, service) {
    return new Promise((resolve, reject) => {
      axios.put(`/services`, service)
        .then((response) => {
          commit('UPDATE_SERVICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
