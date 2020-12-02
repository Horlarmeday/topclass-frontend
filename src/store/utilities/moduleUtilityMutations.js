/*=========================================================================================
  File Name: moduleUtilityMutations.js
  Description: Utilities Module Mutations
==========================================================================================*/


export default {
    ADD_UNIT (state, unit) {
      state.units.unshift(unit)
    },

    SET_UNITS (state, units) {
      state.units = units
    },

    SET_UNITS_TOTAL (state, total) {
      state.unitTotal = total
    },

    SET_UNIT_NUMB_PAGES (state, pages) {
      state.unitPages = pages
    },

    REMOVE_UNIT (state, unitId) {
      const ItemIndex = state.units.findIndex((u) => u.uid === unitId)
      state.units.splice(ItemIndex, 1)
    },

    ADD_LABEL (state, label) {
        state.labels.unshift(label)
    },
  
    SET_LABELS (state, labels) {
        state.labels = labels
    },
  
    SET_LABELS_TOTAL (state, total) {
        state.labelTotal = total
    },
  
    SET_LABEL_NUMB_PAGES (state, pages) {
        state.labelPages = pages
    },
  
    REMOVE_LABEL (state, labelId) {
        const ItemIndex = state.labels.findIndex((l) => l.lid === labelId)
        state.labels.splice(ItemIndex, 1)
    },

    ADD_DEFAULT (state, item) {
      state.defaults.unshift(item)
    },

    SET_DEFAULTS (state, defaults) {
        state.defaults = defaults
    },

    SET_DEFAULTS_TOTAL (state, total) {
        state.defaultTotal = total
    },

    SET_DEFAULT_NUMB_PAGES (state, pages) {
        state.defaultPages = pages
    },

    REMOVE_DEFAULT (state, defaultId) {
        const ItemIndex = state.defaults.findIndex((d) => d.did === defaultId)
        state.defaults.splice(ItemIndex, 1)
    }
}
  