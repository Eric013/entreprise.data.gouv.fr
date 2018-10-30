<template>
  <div class="company">
    <div class="company__main">
      <div class="title__block">
        <h2 v-if="haveSireneInfo">{{resultSirene.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ resultSirene.siren }})</span></h2>
        <h2 v-if="haveOnlyRNAInfo">{{resultRNA.titre}} <span class="association__id">({{ resultRNA.id_association }})</span></h2>

        <template v-if="haveSireneInfo">
          <div class="subtitle"> {{ resultSirene.l6_normalisee }}</div>
          <div class="second__subtitle"> {{ resultSirene.libelle_activite_principale_entreprise }}</div>
        </template>
        <div v-if="haveOnlyRNAInfo" class="second__subtitle"> {{ resultRNA.titre_court}}</div>
        <etablissement-sirene-children />
      </div>
      <etablissement-map v-if=haveSireneInfo :positionEtablissement='coordinates' :etablissement='this.resultSirene'/>
    </div>
    <div class="tabs">
        <div v-if="haveSireneInfo" class="api api__sirene">
          <h4>Base SIRENE</h4>
          <p>Information disponible</p>
          <p>Dernière mise à jour : {{ this.lastUpdateSirene }}</p>
        </div>
        <div v-else class="api api__unavailable">
          <h4>Base SIRENE</h4>
          <p>Information non trouvée</p>
        </div>
        <div v-if="haveRNMInfo" class="api api__rnm">
          <h4>Base RNM</h4>
          <p>Information disponible</p>
          <p>Dernière mise à jour : aujourd'hui</p>
        </div>
        <div v-else class="api api__unavailable">
          <h4>Base RNM</h4>
          <p>Information non trouvée</p>
        </div>
        <div v-if="haveRNAInfo" class="api api__rna">
          <h4>Base RNA</h4>
          <p>Information disponible</p>
          <p>Dernière mise à jour : {{ this.lastUpdateRNA }}</p>
        </div>
        <div v-else class="api api__unavailable">
          <h4>Base RNA</h4>
          <p>Information non trouvée</p>
        </div>
        <div v-if="haveRNCSInfo" class="api api__rncs">
          <h4>Base RNCS</h4>
          <p>Information disponible</p>
          <p>Dernière mise à jour : 2017-05-17</p>
        </div>
        <div v-else class="api api__unavailable">
          <h4>Base RNCS</h4>
          <p>Information non trouvée</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'
import EtablissementMap from '@/components/etablissement/EtablissementMap'

export default {
  name: 'EtablissementHeader',
  components: {
    'EtablissementSireneChildren': EtablissementSireneChildren,
    'EtablissementMap': EtablissementMap
  },
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
    },
    haveOnlyRNAInfo () {
      return (!this.haveSireneInfo && this.haveRNAInfo)
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
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
    lastUpdateSirene () {
      if (this.resultSirene.updated_at) {
        return this.resultSirene.updated_at.substring(0, 10)
      }
    },
    lastUpdateRNA () {
      if (this.resultRNA.updated_at) {
        return this.resultRNA.updated_at.substring(0, 10)
      }
    },
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    }
  },
  mixins: [Filters]
}
</script>

<style lang="scss" scoped>
  .company__main {
    display: flex;
    flex-direction: row;
  }

  #map {
    margin-left: 2em;
  }

  @media (max-width: $desktop) {
    .company__main {
      flex-direction: column;
    }

    #map {
      margin-left: 0;
    }
  }

  h2 {
    margin: 0;
  }

  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }

    margin: 2em 0;
  }

  .api {
    padding: 1em;
    border: 1px solid $color-light-grey;
    border-radius: 3px;
    flex-grow: 1;

    p {
      margin: 0;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 0.5em;
    }
  }

  .api + .api {
    margin-left: 1em;

    @media screen and (max-width: $tablet) {
      margin-left: 0;
      margin-top: 1em;
    }
  }

  .api__unavailable {
    color: $color-darker-grey;
    border: 1px solid $color-dark-grey;
  }

  .no_wrap {
    white-space: nowrap;
  }

  .subtitle {
    font-size: 1.25em;
  }

  .second__subtitle {
    margin-top: 1em;
  }

  .company__siren,
  .second__subtitle {
    color: $color-darker-grey;

  }
</style>
