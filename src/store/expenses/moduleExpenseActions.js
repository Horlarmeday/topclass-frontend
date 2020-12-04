/*=========================================================================================
  File Name: moduleExpenseActions.js
  Description: Expense Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addExpense({ commit }, expense) {
    return new Promise((resolve, reject) => {
      axios.post('/expenditures/expenses/create', expense)
        .then((response) => {
          commit('ADD_EXPENSE',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchExpenses({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/expenditures/expenses', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search } })
        .then((response) => {
          commit('SET_EXPENSES', response.data.data.docs)
          commit('SET_EXPENSES_TOTAL', response.data.data.total)
          commit('SET_EXPENSE_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeExpense({ commit }, expense) {
    return new Promise((resolve, reject) => {
      axios.put(`/expenditures/expenses`, { data: { exid: expense }})
        .then((response) => {
          commit('REMOVE_EXPENSE', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
