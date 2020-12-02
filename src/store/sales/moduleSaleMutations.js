/*=========================================================================================
  File Name: moduleSaleMutations.js
  Description: Sale Module Mutations
==========================================================================================*/


export default {
    ADD_SALE (state, sale) {
      state.sales.unshift(sale)
    },

    SET_SALES (state, sales) {
      state.sales = sales
    },

    SET_SALES_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_SALE (state, sale) {
      state.sale = sale
    },

    UPDATE_SALE (state, sale) {
      const serviceIndex = state.sales.findIndex((s) => s.slid === sale.slid)
      Object.assign(state.sales[serviceIndex], sale)
    },

    REMOVE_SALE (state, saleId) {
      const ItemIndex = state.sales.findIndex((s) => s.slid === saleId)
      state.sales.splice(ItemIndex, 1)
    }
}
  