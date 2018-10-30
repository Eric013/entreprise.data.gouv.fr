<template>
  <section class="section">
    <div class="container">
      <server-error v-if="isError" />
      <not-found v-else-if="isNotFound" />
      <loader v-else-if="isEtablissementLoading" />
      <template v-else>
        <etablissement-header />
        <etablissement-sirene v-if=haveSireneInfo />
        <etablissement-rna v-if=haveRNAInfo :haveComponentTop=haveSireneInfo />
        <etablissement-rnm v-if=haveRNMInfo />
        <etablissement-rncs v-if=haveRNCSInfo />
      </template>
    </div>
  </section>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementRNA from '@/components/etablissement/EtablissementRNA'
import EtablissementRNM from '@/components/etablissement/EtablissementRNM'
import EtablissementRNCS from '@/components/etablissement/EtablissementRNCS'

export default {
  name: 'Etablissement',
  metaInfo () {
    return {
      title: this.titleEtablissement()
    }
  },
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementHeader': EtablissementHeader,
    'EtablissementSirene': EtablissementSirene,
    'EtablissementRna': EtablissementRNA,
    'EtablissementRnm': EtablissementRNM,
    'EtablissementRncs': EtablissementRNCS
  },
  computed: {
    isEtablissementLoading () {
      return this.$store.getters.isEtablissementLoading
    },
    isNotFound () {
      return this.$store.getters.mainAPINotFound
    },
    isError () {
      return this.$store.getters.mainAPIError
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
      } else {
        return false
      }
    },
    haveRNMInfo () {
      if (this.$store.getters.RNMAvailable) {
        return true
      }
    },
    haveRNCSInfo () {
      if (this.$store.getters.RNCSAvailable) {
        return true
      }
    },
    resultSirene () {
      if (this.haveSireneInfo) {
        return this.$store.getters.singlePageEtablissementSirene
      }
      return null
    }
  },
  methods: {
    titleEtablissement () {
      if (this.haveSireneInfo) {
        return `Etablissement ${
          Filters.filters.removeExtraChars(this.$store.getters.singlePageEtablissementSirene.nom_raison_sociale
        )}`
      } else if (this.haveRNAInfo) {
        return `Association ${this.$store.getters.singlePageEtablissementRNA.titre}`
      } else {
        return 'Etablissement'
      }
    }
  },
  beforeCreate () {
    this.$store.commit('setStoredSuggestions', '')
    this.$store.commit('clearSirenResults')
    this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
    }
  }
}
</script>
