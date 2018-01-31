import Vue from 'vue'
import store from '@/store/index.js'
import router from '@/router/index.js'

const state = {
  storedFullText: '',
  storedLastFullText: '',
  storedSiret: '',
  pageNumber: 1,
  baseAdress: process.env.BASE_ADRESS,
  baseAdressSiret: process.env.BASE_ADRESS_SIRET,
  baseAdressSiren: process.env.BASE_ADRESS_SIREN
}

const getters = {
  adressToGet: state => {
    return state.baseAdress + store.getters.queryToGet
  },
  queryToGet: state => {
    return store.state.route.query.fullText + store.getters.optionsToGet
  },
  pageNumberToGet: state => {
    return '?page=' + store.state.route.query.page
  },
  optionsToGet: state => {
    return store.getters.pageNumberToGet + store.getters.filtersToGet + store.getters.categoryToGet
  },
  categoryToGet: state => {
    switch (store.state.route.query.category) {
      case 'all':
        return ''
      case 'entreprises':
        return '&is_entrepreneur_individuel=no'
      case 'entreprisesIndividuelles':
        return '&is_entrepreneur_individuel=yes'
      case 'associations':
        return '&is_ess=O'
    }
  },
  filtersToGet: state => {
    let filters = ''
    if (store.state.route.query.postalCode) {
      filters = filters + '&code_postal=' + store.state.route.query.postalCode
    }
    if (store.state.route.query.activityCode) {
      filters = filters + '&activite_principale=' + store.state.route.query.activityCode
    }
    return filters
  },
  adressToGetWithoutCategories: state => {
    return state.baseAdress + store.state.route.query.fullText + store.getters.pageNumberToGet + store.getters.filtersToGet
  }
}

const mutations = {
  setFullText (state, value) {
    state.storedFullText = value
  },
  setLastFullText (state, value) {
    state.storedLastFullText = value
  },
  setSiret (state, value) {
    state.storedSiret = value
  },
  setPage (state, value) {
    state.pageNumber = value
  }
}

const actions = {
  requestSearch () {
    router.push({ path: '/search',
      query: {
        fullText: state.storedFullText,
        page: state.pageNumber,
        postalCode: store.state.filters.filterPostalCode,
        activityCode: store.state.filters.filterActivityCode,
        category: store.state.categories.focusedCategory
      }
    })
    store.dispatch('executeSearch')
    store.commit('setLastFullText', state.storedFullText)
  },
  executeSearch () { // Calling this action won't update the router
    if (store.getters.infoMessage) {
      return false
    }
    store.dispatch('hideWelcomeText')
    store.dispatch('hideSuggestions')
    Vue.http.get(store.getters.adressToGet).then(response => {
      store.dispatch('setResponse', response)
    }, response => {
      if (state.pageNumber > 1) {
        store.commit('setPage', 1)
        store.dispatch('executeSearch')
      } else {
        store.dispatch('setResponse', response)
      }
    })
  },
  setResponse (dispatch, response) {
    store.commit('setResults', response.body)
    store.commit('setStatus', response.status)
  },
  executeSearchBySiret (dispatch, siret) {
    store.dispatch('hideWelcomeText')
    Vue.http.get(dispatch.state.baseAdressSiret + siret).then(response => {
      store.commit('setSinglePageResults', response.body)
    }, response => {
      store.commit('setSinglePageResults', null)
    })
  },
  executeSearchBySiren (dispatch, siren) {
    Vue.http.get(dispatch.state.baseAdressSiren + siren).then(response => {
      store.commit('setSirenResults', response.body)
    }, response => {
      store.commit('setSirenResults', null)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
