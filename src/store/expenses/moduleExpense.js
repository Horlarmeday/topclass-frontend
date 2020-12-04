/*=========================================================================================
  File Name: moduleExpense.js
  Description: Expense Module
==========================================================================================*/


import state from './moduleExpenseState.js'
import mutations from './moduleExpenseMutations.js'
import actions from './moduleExpenseActions.js'
import getters from './moduleExpenseGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
