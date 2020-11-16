/*=========================================================================================
  File Name: moduleCustomerActions.js
  Description: Customer Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addCustomer({ commit }, customer) {
    return new Promise((resolve, reject) => {
      axios.post('/customers/create', customer)
        .then((response) => {
          commit('ADD_CUSTOMER',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchCustomers ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/customers', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter } })
        .then((response) => {
          commit('SET_CUSTOMERS', response.data.data.docs)
          commit('SET_CUSTOMERS_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchParamCustomer({ commit }, customerId) {
    return new Promise((resolve, reject) => {
      axios.get(`/customers/${customerId}`)
        .then((response) => {
          commit('SET_CUSTOMER', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateCustomer ({ commit }, customer) {
    return new Promise((resolve, reject) => {
      axios.put(`/customers`, customer)
        .then((response) => {
          commit('UPDATE_CUSTOMER', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
