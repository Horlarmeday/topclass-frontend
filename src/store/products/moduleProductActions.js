/*=========================================================================================
  File Name: moduleProductActions.js
  Description: Product Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addProduct({ commit }, product) {
    return new Promise((resolve, reject) => {
      axios.post('/products/create', product)
        .then((response) => {
          commit('ADD_PRODUCT',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchProducts ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/products', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter } })
        .then((response) => {
          commit('SET_PRODUCTS', response.data.data.docs)
          commit('SET_PRODUCTS_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchParamProduct({ commit }, productId) {
    return new Promise((resolve, reject) => {
      axios.get(`/products/${productId}`)
        .then((response) => {
          commit('SET_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateProduct ({ commit }, product) {
    return new Promise((resolve, reject) => {
      axios.put(`/products`, product)
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  returnProduct ({ commit }, product) {
    return new Promise((resolve, reject) => {
      axios.put(`/products/return`, product)
        .then((response) => {
          commit('UPDATE_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
