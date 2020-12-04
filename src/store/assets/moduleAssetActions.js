/*=========================================================================================
  File Name: moduleAssetActions.js
  Description: Asset Module Actions
==========================================================================================*/

import axios from '../../axios'

export default {
  addAsset({ commit }, asset) {
    return new Promise((resolve, reject) => {
      axios.post('/expenditures/assets/create', asset)
        .then((response) => {
          commit('ADD_ASSET',  response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAssets({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('/expenditures/assets', { params: { currentPage: payload.currentPage, pageLimit: payload.itemsPerPage, search: payload.search } })
        .then((response) => {
          commit('SET_ASSETS', response.data.data.docs)
          commit('SET_ASSETS_TOTAL', response.data.data.total)
          commit('SET_ASSET_NUMB_PAGES', response.data.data.pages)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeAsset ({ commit }, asset) {
    return new Promise((resolve, reject) => {
      axios.put(`/expenditures/assets`, { data: { asid: asset }})
        .then((response) => {
          commit('REMOVE_ASSET', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
}
