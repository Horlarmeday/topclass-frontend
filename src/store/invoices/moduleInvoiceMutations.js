/*=========================================================================================
  File Name: moduleInvoiceMutations.js
  Description: Invoice Module Mutations
==========================================================================================*/


export default {
    ADD_INVOICE (state, invoice) {
      state.invoices.unshift(invoice)
    },
    SET_INVOICES (state, invoices) {
      state.invoices = invoices
    },

    SET_INVOICES_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_INVOICE (state, invoice) {
      state.invoice = invoice
    },

    UPDATE_INVOICE (state, invoice) {
      const invoiceIndex = state.invoices.findIndex((i) => i.ivid === invoice.ivid)
      Object.assign(state.invoices[invoiceIndex], invoice)
    },

    REMOVE_INVOICE (state, invoiceId) {
      const ItemIndex = state.invoices.findIndex((i) => i.ivid === invoiceId)
      state.invoices.splice(ItemIndex, 1)
    }
}
  