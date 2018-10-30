<template>
  <div class="company__panel panel">
    <h4>Informations d'activité et d´établissement principal</h4>
    <hr>
    <div class="company__item">
      <div class="company__item-key">Greffe :</div>
      <div class="company__item-value"> {{ RNCSConcatGreffe(this.RNCSData) }}</div>
    </div>
    <panel-info-rncs :parent=RNCSData :elements=this.elementsToDisplay1 />
    <div class="company__item">
      <div class="company__item-key">Type D'inscription :</div>
      <div class="company__item-value"> {{ PrincipaleOrSecondaire(this.RNCSData.type_inscription) }}</div>
    </div>
    <panel-info-inline-rncs class="company__item" :parent=RNCSData :elements=this.elementsToDisplay2 />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSInfos',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS
  },
  data () {
    return {
      elementsToDisplay1:
      {
        "SIREN": "siren",
        "Numero Gestion Greffe": "numero_gestion"
      },
      elementsToDisplay2:
      {
        "Date Immatriculation": "date_immatriculation",
        "Date Première Immatriculation": "date_premiere_immatriculation",
        "Date de Radiation": "date_radiation",
        "Date de Transfert": "date_transfert",
        "Sans Activité": "sans_activite",
        "Date de début d'activité": "date_debut_activite",
        "Date de Début de Première Activité": "date_debut_premiere_activite",
        "Date de Cessation d'Activité": "date_cessation_activite",
      }
    }
  },
  computed: {
    RNCSData () {
      return this.$store.getters.RNCSData
    },
  },
  mixins: [Filters, Formating]
}
</script>

<style lang="scss" scoped>
  .panel {
    border: 2px $color-light-orange solid;
  }
</style>
