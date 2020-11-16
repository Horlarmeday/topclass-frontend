/*=========================================================================================
  File Name: moduleUtilityActions.js
  Description: Utilities Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addUnit({ commit }, unit) {
    return new Promise((resolve, reject) => {
      axios.post('/utilities/unit/create', unit)
        .then((response) => {
          commit('ADD_UNIT',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUnits ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/utilities/unit', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search } })
        .then((response) => {
          commit('SET_UNITS', response.data.data.docs)
          commit('SET_UNITS_TOTAL', response.data.data.total)
          commit('SET_UNIT_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  deleteUnit ({ commit }, unit) {
    return new Promise((resolve, reject) => {
      axios.delete(`/utilities/unit`, { data: { uid: unit }})
        .then((response) => {
          commit('REMOVE_UNIT', response.data.data.uid)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  addLabel({ commit }, label) {
    return new Promise((resolve, reject) => {
      axios.post('/utilities/label/create', label)
        .then((response) => {
          commit('ADD_LABEL',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchLabels ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/utilities/label', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search } })
        .then((response) => {
          commit('SET_LABELS', response.data.data.docs)
          commit('SET_LABELS_TOTAL', response.data.data.total)
          commit('SET_LABEL_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  deleteLabel ({ commit }, label) {
    return new Promise((resolve, reject) => {
      axios.delete(`/utilities/label`, { data: { lid: label }})
        .then((response) => {
          commit('REMOVE_LABEL', response.data.data.lid)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
