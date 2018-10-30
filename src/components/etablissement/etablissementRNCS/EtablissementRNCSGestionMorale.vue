<template>
  <div class="company__panel panel">
    <h4>Gestionnaires (Personnes morales)</h4>
    <hr>
    <div v-for="manager in managersLegal" :key=manager.id>
      <h5>{{ manager.qualite | capitalize }}</h5>
      <panel-info-rncs :parent="manager" :elements=elementsToDisplay />
      <div class="company__item-key">Adresse :</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_1">{{ manager.adresse_ligne_1 | ifExist }}</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
      <div class="company__item-value" v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
      <div class="company__item-value" v-if="manager.adresse_code_commune">Code Commune : {{ manager.adresse_code_commune }}</div>
      <div class="company__item-value"> {{ RNCSConcatAddress(manager) }}</div>
    </div>
    <panel-no-results-rncs :ifNotPresent="managersLegal" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS'
import PanelNoResultsRNCS from '@/components/templates/PanelNoResultsRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSGestionMorale',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS,
    'PanelNoResultsRncs': PanelNoResultsRNCS
  },
  data () {
    return {
      elementsToDisplay:
      {
        "Denomination": "denomination",
        "Forme Juridique": "forme_juridique",
        "SIREN": "siren_pm"
      },
      elementsToDisplayRepresentant :
      {
        "Représentant Permanent, Adresse Ligne 1": "representant_permanent_adresse_ligne_1",
        "Représentant Permanent, Adresse Ligne 2": "representant_permanent_adresse_ligne_2",
        "Représentant Permanent, Adresse Ligne 3": "representant_permanent_adresse_ligne_3",
        "Représentant Permanent, Code Postal": "representant_permanent_adresse_code_postal",
        "Représentant Permanent, Ville": "representant_permanent_adresse_ville",
        "Représentant Permanent, Code Commune": "representant_permanent_adresse_code_commune",
        "Représentant Permanent, Pays": "representant_permanent_adresse_pays",
        "Représentant Permanent, Adresse Ligne 3": "representant_permanent_adresse_ligne_3",
        "Représentant Permanent, Nom Patronyme": "representant_permanent_nom_patronyme",
        "Représentant Permanent, Nom d'Usage": "representant_permanent_nom_usage",
        "Représentant Permanent, Prénoms": "representant_permanent_prenoms",
        "Représentant Permanent, Date Naissance": "representant_permanent_date_naissance",
        "Représentant Permanent, Ville Naissance": "representant_permanent_ville_naissance",
        "Représentant Permanent, Pays Naissance": "representant_permanent_pays_naissance",
        "Représentant Permanent, Nationalité": "representant_permanent_nationalite"
      }
    }
  },
  computed: {
    managers () {
      return this.$store.getters.RNCSData.representants
    },
    managersLegal () {
      return this.managers.filter(manager => (manager.type_representant == 'P. Morale'))
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
