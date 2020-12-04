/*=========================================================================================
  File Name: moduleSaleActions.js
  Description: Sale Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
//   addService({ commit }, service) {
//     return new Promise((resolve, reject) => {
//       axios.post('/services/create', service)
//         .then((response) => {
//           commit('ADD_SERVICE',  response.data.data)
//           resolve(response)
//         })
//         .catch((error) => { reject(error) })
//     })
//   },
  fetchSales ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/sales', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter, data: payload.data } })
        .then((response) => {
          commit('SET_SALES', response.data.data.docs)
          commit('SET_SALES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchParamSale({ commit }, saleId) {
    return new Promise((resolve, reject) => {
      axios.get(`/sales/${saleId}`)
        .then((response) => {
          commit('SET_SALE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateSale ({ commit }, sale) {
    return new Promise((resolve, reject) => {
      axios.put(`/sales`, sale)
        .then((response) => {
          commit('UPDATE_SALE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  applyDiscount ({ commit }, sale) {
    return new Promise((resolve, reject) => {
      axios.put(`/sales/discount`, sale)
        .then((response) => {
          commit('SET_SALE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  addPayment({ commit }, payment) {
    return new Promise((resolve, reject) => {
      axios.post('/sales/payment', payment)
        .then((response) => {
          commit('UPDATE_SALE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
