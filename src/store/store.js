import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    storedResults: null,
    storedStatus: null,
    storedFullText: '',
    baseAdress: 'http://localhost:3000/full_text/',
    pageNumber: 1,
    filterPostalCode: '',
    filterActivityCode: ''
  },
  getters: {
    storedResultsEtablissements: state => {
      if (state.storedResults !== null) {
        return state.storedResults.etablissement
      } else {
        return null
      }
    },
    numberResults: state => {
      if (state.storedStatus === 404) {
        store.commit('clearResults')
        return 0
      } else if (state.storedResults !== null) {
        return state.storedResults.total_results
      }
    },
    totalPageNumber: state => {
      if (state.storedResults !== null) {
        return state.storedResults.total_pages
      }
    },
    pageNumberToGet: state => {
      return '?page='.concat(state.pageNumber)
    },
    adressToGet: state => {
      return state.baseAdress.concat(state.storedFullText).concat(store.getters.optionsToGet)
    },
    optionsToGet: state => {
      return store.getters.pageNumberToGet.concat(store.getters.filtersToGet)
    },
    filtersToGet: state => {
      var filters = ''
      if (state.filterPostalCode !== '') {
        filters = filters.concat('&code_postal=').concat(state.filterPostalCode)
      }
      if (state.filterActivityCode !== '') {
        filters = filters.concat('&activite_principale=').concat(state.filterActivityCode)
      }
      return filters
    }
  },
  mutations: {
    setResults (state, value) {
      state.storedResults = value
    },
    clearResults (state) {
      state.storedResults = null
    },
    clearFilters (state) {
      state.filterPostalCode = ''
      state.filterActivityCode = ''
    },
    setFullText (state, value) {
      state.storedFullText = value
    },
    setSearchFilters (state, filterSearch) {
      if (filterSearch.name === 'Code Postal') {
        state.filterPostalCode = filterSearch.value
      }
      if (filterSearch.name === 'Activite Principale') {
        state.filterActivityCode = filterSearch.value
      }
    },
    executeSearch (state) {
      Vue.http.get(store.getters.adressToGet).then(response => {
        state.storedStatus = response.status
        state.storedResults = response.body
      }, response => {
        if (state.pageNumber !== 1) {
          state.pageNumber = 1
          store.commit('executeSearch') // BAM, recursive research ! TODO: Verifier si c'est une idée brillante ou stupide
        } else {
          state.storedStatus = response.status
        }
      })
    }
  }
})
export default store
