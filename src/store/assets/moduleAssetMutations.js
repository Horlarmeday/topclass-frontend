/*=========================================================================================
  File Name: moduleAssetMutations.js
  Description: Asset Module Mutations
==========================================================================================*/


export default {
    ADD_ASSET (state, asset) {
      state.assets.unshift(asset)
    },
    SET_ASSETS (state, assets) {
      state.assets = assets
    },

    SET_ASSETS_TOTAL (state, total) {
      state.total = total
    },

    SET_ASSET_NUMB_PAGES (state, pages) {
      state.pages = pages
    },

    SET_ASSET (state, asset) {
      state.asset = asset
    },

    UPDATE_ASSET (state, asset) {
      const assetIndex = state.assets.findIndex((i) => i.asid === asset.asid)
      Object.assign(state.assets[assetIndex], asset)
    },

    REMOVE_ASSET (state, assetId) {
      const ItemIndex = state.assets.findIndex((i) => i.asid === assetId)
      state.assets.splice(ItemIndex, 1)
    }
}
  