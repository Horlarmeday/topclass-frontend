/*=========================================================================================
  File Name: moduleCustomerMutations.js
  Description: Customer Module Mutations
==========================================================================================*/


export default {
    ADD_CUSTOMER (state, customer) {
      state.customers.unshift(customer)
    },

    SET_CUSTOMERS (state, customers) {
      state.customers = customers
    },

    SET_CUSTOMERS_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_CUSTOMER (state, customer) {
      state.customer = customer
    },
    // SET_LABELS(state, labels) {
    //   state.eventLabels = labels
    // },
    UPDATE_CUSTOMER (state, customer) {
      const customerIndex = state.customers.findIndex((p) => p.cid === customer.cid)
      Object.assign(state.customers[customerIndex], customer)
    },
    REMOVE_CUSTOMER (state, customerId) {
      const ItemIndex = state.customers.findIndex((p) => p.cid === customerId)
      state.customers.splice(ItemIndex, 1)
    }
  }
  