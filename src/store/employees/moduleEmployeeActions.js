/*=========================================================================================
  File Name: moduleEmployeeActions.js
  Description: Employee Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addEmployee ({ commit }, employee) {
    return new Promise((resolve, reject) => {
      axios.post('/staffs/create', employee)
        .then((response) => {
          commit('ADD_EMPLOYEE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchEmployees ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/staffs', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search, filter: payload.filter } })
        .then((response) => {
          commit('SET_EMPLOYEES', response.data.data.docs)
          commit('SET_EMPLOYEES_TOTAL', response.data.data.total)
          commit('SET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchEmployee({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get("/staffs/sub")
        .then((response) => {
          commit('SET_EMPLOYEE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  
  fetchParamEmployee({ commit }, employeeId) {
    return new Promise((resolve, reject) => {
      axios.get(`/staffs/${employeeId}`)
        .then((response) => {
          commit('SET_EMPLOYEE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateEmployee ({ commit }, employee) {
    return new Promise((resolve, reject) => {
      axios.put(`/staffs`, employee)
        .then((response) => {
          commit('UPDATE_EMPLOYEE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  changePassword ({ commit }, password) {
    return new Promise((resolve, reject) => {
      axios.post('/staffs/change-password', password)
        .then((response) => {
          commit('ADD_EMPLOYEE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
