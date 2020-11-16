/*=========================================================================================
  File Name: moduleProductMutations.js
  Description: Product Module Mutations
==========================================================================================*/


export default {
    ADD_PRODUCT (state, product) {
      state.products.unshift(product)
    },

    SET_PRODUCTS (state, products) {
      state.products = products
    },

    SET_PRODUCTS_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_PRODUCT (state, product) {
      state.product = product
    },

    UPDATE_PRODUCT (state, product) {
      const productIndex = state.products.findIndex((p) => p.pid === product.pid)
      Object.assign(state.products[productIndex], product)
    },

    REMOVE_PRODUCT (state, productId) {
      const ItemIndex = state.products.findIndex((p) => p.pid === productId)
      state.products.splice(ItemIndex, 1)
    }
}
  