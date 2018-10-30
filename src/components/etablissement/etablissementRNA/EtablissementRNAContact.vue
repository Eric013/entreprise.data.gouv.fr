<template>
  <div class="company__panel panel">
    <h4>Contact</h4>
    <div class="company__item"><div class="company__item-key">Adresse du siège :</div><div class="company__item-value"> {{ resultRNA.adresse_siege | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">Adresse établissement :</div><div class="company__item-value"> {{ this.l1_adress | ifExist}}</div></div>
    <div class="company__item"><div class="company__item-key">Commune établissement :</div><div class="company__item-value"> {{ this.l2_adress | ifExist}}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementRNAContact',
  computed: {
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
    },
    l1_adress () {
      if (this.resultRNA.adresse_numero_voie && this.resultRNA.adresse_type_voie && this.resultRNA.adresse_libelle_voie) {
        return `${this.resultRNA.adresse_numero_voie} ${this.resultRNA.adresse_type_voie.toLowerCase() } ${this.resultRNA.adresse_libelle_voie}`
      }
    },
    l2_adress () {
      if (this.resultRNA.adresse_code_postal && this.resultRNA.adresse_libelle_commune) {
        return `${this.resultRNA.adresse_code_postal} ${this.resultRNA.adresse_libelle_commune}`
      }
    }
  },
  mixins: [Filters]
}
</script>

