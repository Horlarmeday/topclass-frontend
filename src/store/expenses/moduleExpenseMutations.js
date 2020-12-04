/*=========================================================================================
  File Name: moduleExpenseMutations.js
  Description: Expense Module Mutations
==========================================================================================*/


export default {
    ADD_EXPENSE (state, expense) {
      state.expenses.unshift(expense)
    },
    SET_EXPENSES (state, expenses) {
      state.expenses = expenses
    },

    SET_EXPENSES_TOTAL (state, total) {
      state.total = total
    },

    SET_EXPENSE_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_EXPENSE (state, expense) {
      state.expense = expense
    },

    UPDATE_EXPENSE (state, expense) {
      const expenseIndex = state.expenses.findIndex((i) => i.exid === expense.exid)
      Object.assign(state.expenses[expenseIndex], expense)
    },

    REMOVE_EXPENSE (state, expenseId) {
      const ItemIndex = state.expenses.findIndex((i) => i.exid === expenseId)
      state.expenses.splice(ItemIndex, 1)
    }
}
  