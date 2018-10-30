<template>
  <div class="container">
    <loader v-if="resultsAreLoading"></loader>
    <server-error v-else-if="serverError"></server-error>
    <template v-else>
      <results-sirene />
      <!-- <hr /> -->
      <!-- <results-rna /> -->
      <!-- paginate module on RNA and Sirene, so we use the bigger values -->
      <results-paginate-module :totalPages=biggerNumberPages></results-paginate-module>
    </template>
  </div>
</template>

<script>
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import ResultsSirene from '@/components/results/ResultsSirene'
import ResultsRNA from '@/components/results/ResultsRNA'
import ResultsPaginateModule from '@/components/results/ResultsPaginateModule'

export default {
  name: 'Results',
  metaInfo () {
    return {
      title: `Recherche : ${this.storedLastFullText()}`
    }
  },
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'ResultsSirene': ResultsSirene,
    'ResultsRna': ResultsRNA,
    'ResultsPaginateModule': ResultsPaginateModule
  },
  computed: {
    resultsAreLoading () {
      return this.$store.getters.isFullTextLoading
    },
    serverError () {
      return this.$store.getters.mainAPIError
    },
    // Removing RNA values for now
    // biggerNumberPages () {
    //   return Math.max(this.$store.getters.totalPageNumberSirene, this.$store.getters.totalPageNumberRNA)
    // }
    biggerNumberPages () {
      return this.$store.getters.totalPageNumberSirene
    }
  },
  methods: {
    storedLastFullText () {
      return this.$store.state.searchFullText.storedLastFullText
    }
  }
}

</script>

<style lang="scss" scoped>

  .container {
    padding-top: 2em;
    padding-bottom: 2em;
  }

</style>
