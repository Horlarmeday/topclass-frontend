/*=========================================================================================
  File Name: moduleWaybillMutations.js
  Description: Waybill Module Mutations
==========================================================================================*/


export default {
    ADD_WAYBILL (state, waybill) {
      state.waybills.unshift(waybill)
    },
    SET_WAYBILLS (state, waybills) {
      state.waybills = waybills
    },

    SET_WAYBILLS_TOTAL (state, total) {
      state.total = total
    },

    SET_WAYBILL_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_WAYBILL (state, waybill) {
      state.waybill = waybill
    },

    UPDATE_WAYBILL (state, waybill) {
      const waybillIndex = state.waybills.findIndex((i) => i.wyid === waybill.wyid)
      Object.assign(state.waybills[waybillIndex], waybill)
    },

    REMOVE_WAYBILL (state, waybillId) {
      const ItemIndex = state.waybills.findIndex((i) => i.wyid === waybillId)
      state.waybills.splice(ItemIndex, 1)
    }
}
  