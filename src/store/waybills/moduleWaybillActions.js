/*=========================================================================================
  File Name: moduleUtilityActions.js
  Description: Utilities Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addWaybill({ commit }, waybill) {
    return new Promise((resolve, reject) => {
      axios.post('/invoices/waybill/create', waybill)
        .then((response) => {
          commit('ADD_WAYBILL',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchWaybills({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/invoices/waybill', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search } })
        .then((response) => {
          commit('SET_WAYBILLS', response.data.data.docs)
          commit('SET_WAYBILLS_TOTAL', response.data.data.total)
          commit('SET_WAYBILL_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchParamWaybill({ commit }, waybillId) {
    return new Promise((resolve, reject) => {
      axios.get(`/invoices/waybill/${waybillId}`, waybillId)
        .then((response) => {
          commit('SET_WAYBILL',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateWaybill ({ commit }, waybill) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/waybill`, waybill)
        .then((response) => {
          commit('UPDATE_WAYBILL', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
