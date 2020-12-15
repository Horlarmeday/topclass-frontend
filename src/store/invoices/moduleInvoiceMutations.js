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

    SET_ITEMS (state, items) {
      state.items = items
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

    DISPENSE_ITEM (state, item) {
      const itemIndex = state.items.findIndex((i) => i.inv_id === item.inv_id)
      Object.assign(state.items[itemIndex], item)
    },

    REMOVE_INVOICE (state, invoiceId) {
      const ItemIndex = state.invoices.findIndex((i) => i.ivid === invoiceId)
      state.invoices.splice(ItemIndex, 1)
    }
}
  