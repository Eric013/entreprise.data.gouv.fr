<template>
  <div class="company__panel panel">
    <h4>Gestionnaires (Personnes physiques)</h4>
    <hr>
    <div v-for="manager in managersPhysical" :key=manager.id>
      <h5>{{ manager.qualite | capitalize }}</h5>
      <panel-info-rncs :parent="manager" :elements=elementsToDisplay />
      <div class="company__item-key">Adresse :</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_1">{{ manager.adresse_ligne_1 | ifExist }}</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
      <div class="company__item-value"> {{ RNCSConcatAddress(manager) }}</div>
      <div class="company__item-value" v-if="manager.adresse_code_commune">Code Commune {{ manager.adresse_code_commune }}</div>
    </div>
    <panel-no-results-rncs :ifNotPresent="managersPhysical" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelNoResultsRNCS from '@/components/templates/PanelNoResultsRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestionPhysique',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelNoResultsRncs': PanelNoResultsRNCS
  },
  data () {
    return {
      elementsToDisplay:
        {
          "Nom Patronyme": "nom_patronyme",
          "Nom d'Usage": "nom_usage",
          "Pseudonyme": "pseudonyme",
          "Prenoms": "prenoms",
          "Date Naissance": "date_naissance",
          "Ville Naissance": "ville_naissance",
          "Pays Naissance": "pays_naissance",
          "Nationalité": "nationalite",
          "Conjoint collaborateur, Date de Fin":"conjoint_collab_date_fin",
          "Conjoint collaborateur, Nom Patronyme":"conjoint_collab_nom_patronyme",
          "Conjoint collaborateur, Nom d'Usage":"conjoint_collab_nom_usage",
          "Conjoint collaborateur, Pseudonyme":"conjoint_collab_pseudonyme",
          "Conjoint collaborateur, Prénoms":"conjoint_collab_prénoms"
        }
    }
  },
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    },
    managersPhysical () {
      return this.managers.filter(manager => (manager.type_representant == 'P.Physique'))
    },
    noManagersPhysical () {
      if (this.managersPhysical && this.managersPhysical.length != 0) {
        return false
      }
      return true
    }
  },
  mixins: [Filters, Formating]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
