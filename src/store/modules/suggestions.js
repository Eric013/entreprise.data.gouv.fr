import Vue from 'vue'
import store from '@/store/index.js'

const state = {
  storedSuggestions: '',
  baseAdressSuggestions: process.env.BASE_ADRESS_SUGGESTIONS,
  querySuggestions: ''
}

const getters = {
  suggestionAdressToGet: state => {
    return state.baseAdressSuggestions + state.querySuggestions
  }
}

const mutations = {
  setQuerySuggestions (state, query) {
    state.querySuggestions = query
  },
  setStoredSuggestions (state, suggestions) {
    state.storedSuggestions = suggestions
  }
}

const actions = {
  executeSearchSuggestions () {
    store.dispatch('hideWelcomeText')
    Vue.http.get(this.getters.suggestionAdressToGet).then(response => {
      store.commit('setStoredSuggestions', response.body)
    }, response => {
      store.commit('setStoredSuggestions', null)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
