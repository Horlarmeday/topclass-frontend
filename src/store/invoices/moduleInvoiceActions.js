/*=========================================================================================
  File Name: moduleInvoiceActions.js
  Description: Invoice Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addInvoice ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.post('/invoices/create', invoice)
        .then((response) => {
          commit('ADD_INVOICE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchInvoices ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/invoices', { params: { 
        currentPage: payload.currentPage, 
        pageLimit: payload.itemsPerPage, 
        search: payload.search, 
        filter: payload.filter, 
        stepdown: payload.stepdown, 
        dispense: payload.dispense,
        start: payload.start,
        end: payload.end
      }})
        .then((response) => {
          commit('SET_INVOICES', response.data.data.docs)
          commit('SET_INVOICES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchStaffInvoices ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/invoices/staff-invoices', { params: { 
        currentPage: payload.currentPage, 
        pageLimit: payload.itemsPerPage,
      }})
        .then((response) => {
          commit('SET_INVOICES', response.data.data.docs)
          commit('SET_INVOICES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // SOCKET_send({commit}, payload) {
  //   this.$socket.emit('new_invoice', payload)
  // },

  fetchInvoiceItems ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.post('/invoices/items', invoice)
        .then((response) => {
          commit('SET_ITEMS',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchParamInvoice({ commit }, invoiceId) {
    return new Promise((resolve, reject) => {
      axios.get(`/invoices/${invoiceId}`)
        .then((response) => {
          commit('SET_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchOneInvoice({ commit }, invoiceId) {
    return new Promise((resolve, reject) => {
      axios.post(`/invoices/getById`, invoiceId)
        .then((response) => {
          commit('SET_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateInvoice ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/${payload.id}`, payload.invoice)
        .then((response) => {
          commit('UPDATE_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  deleteInvoiceItem ({ commit }, invoiceId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/invoices`, { data: { inv_id: invoiceId }})
        .then((response) => {
          commit('DELETE_INVOICE', response.data.data.inv_id)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  dispenseItem ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/dispense`, invoice)
        .then((response) => {
          commit('DISPENSE_ITEM', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeInvoice ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices`, { data: { ivid: invoice }})
        .then((response) => {
          commit('REMOVE_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  approveInvoice ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/approve`, invoice)
        .then((response) => {
          commit('UPDATE_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  stepDownInvoice ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/stepdown`, invoice)
        .then((response) => {
          commit('UPDATE_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  
  declineInvoice ({ commit }, invoice) {
    return new Promise((resolve, reject) => {
      axios.put(`/invoices/decline`, invoice)
        .then((response) => {
          commit('UPDATE_INVOICE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
