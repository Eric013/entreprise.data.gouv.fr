<template>
  <div>
    <h4>Personne morale</h4>
    <hr>
    <panel-info-rncs class="company__item" :parent=RNCSLegal :elements=this.elementsToDisplay1 />
     <div class="company__item">
      <div class="company__item-key">Informations Capital :</div>
      <div class="company__item-value"> {{ RNCSDeviseSentence(this.RNCSLegal) }}</div>
    </div>
    <panel-info-inline-rncs class="company__item" :parent=RNCSLegal :elements=this.elementsToDisplay2 />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'
import PanelInfoInlineRNCS from '@/components/templates/PanelInfoInlineRNCS'
import Filters from '@/components/mixins/filters'
import Formating from '@/components/mixins/formating'

export default {
  name: 'EtablissementRNCSPMorale',
  components: {
    'PanelInfoRncs': PanelInfoRNCS,
    'PanelInfoInlineRncs': PanelInfoInlineRNCS
  },
  data () {
    return {
      elementsToDisplay1:
      {
        "Dénomination": "denomination",
        "Sigle": "sigle",
        "Forme Juridique": "forme_juridique",
        "Associé Unique":"associe_unique",
        "Activité Principale": "activite_principale"
      },
      elementsToDisplay2 :
      {
        "Date Clotûre": "date_cloture",
        "Date Clotûre Exceptionnelle": "date_cloture_exeptionnelle",
        "Durée Personne Morale": "duree_pm", // TODO: display in activity ?
        // "Economie Sociale Solidaire": "economie_sociale_solidaire" // TODO: Display as flag
      }
    }
  },
  computed: {
    RNCSLegal () {
      return this.$store.getters.RNCSData.personne_morale
    }
  },
  mixins: [Filters, Formating]
}
</script>