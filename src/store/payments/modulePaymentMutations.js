/*=========================================================================================
  File Name: modulePaymentMutations.js
  Description: Payment Module Mutations
==========================================================================================*/


export default {
    SET_PAYMENTS (state, payments) {
      state.payments = payments
    },

    SET_PAYMENTS_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_PAYMENT (state, payment) {
      state.payment = payment
    },

    // UPDATE_PRODUCT (state, product) {
    //   const productIndex = state.products.findIndex((p) => p.pid === product.pid)
    //   Object.assign(state.products[productIndex], product)
    // },

    // REMOVE_PRODUCT (state, productId) {
    //   const ItemIndex = state.products.findIndex((p) => p.pid === productId)
    //   state.products.splice(ItemIndex, 1)
    // }
}
  