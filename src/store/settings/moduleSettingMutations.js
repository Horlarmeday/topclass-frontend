/*=========================================================================================
  File Name: moduleSettingMutations.js
  Description: Setting Module Mutations
==========================================================================================*/


export default {
    ADD_SETTING (state, setting) {
      state.settings.unshift(setting)
    },

    SET_SETTINGS (state, settings) {
      state.settings = settings
    },

    SET_SETTINGS_TOTAL (state, total) {
      state.total = total
    },

    SET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_SETTING (state, setting) {
      state.setting = setting
    },

    UPDATE_SETTING (state, setting) {
      const serviceIndex = state.settings.findIndex((s) => s.stid === setting.stid)
      Object.assign(state.settings[serviceIndex], setting)
    },

    REMOVE_SETTING (state, settingId) {
      const ItemIndex = state.settings.findIndex((s) => s.stid === settingId)
      state.settings.splice(ItemIndex, 1)
    }
}
  