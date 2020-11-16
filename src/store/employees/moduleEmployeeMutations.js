/*=========================================================================================
  File Name: moduleEmployeeMutations.js
  Description: Employee Module Mutations
==========================================================================================*/


export default {
    ADD_EMPLOYEE (state, employee) {
      state.employees.unshift(employee)
    },
    SET_EMPLOYEES (state, employees) {
      state.employees = employees
    },

    SET_EMPLOYEES_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_EMPLOYEE (state, employee) {
      state.employee = employee
    },
    // SET_LABELS(state, labels) {
    //   state.eventLabels = labels
    // },
    UPDATE_EMPLOYEE (state, employee) {
      const employeeIndex = state.employees.findIndex((p) => p.sid === employee.sid)
      Object.assign(state.employees[employeeIndex], employee)
    },
    REMOVE_EMPLOYEE (state, employeeId) {
      const ItemIndex = state.employees.findIndex((p) => p.sid === employeeId)
      state.employees.splice(ItemIndex, 1)
    }
  }
  