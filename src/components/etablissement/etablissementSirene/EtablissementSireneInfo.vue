<template>
  <div class="company__panel panel">
    <div class="name__category">
      <h4>Informations générales</h4>
    </div>
    <div class="company__item"><label class="company__item-key">SIRET</label><div class="company__item-value"> {{ resultSirene.siret }}</div></div>
    <div class="company__item"><label class="company__item-key">SIREN</label><div class="company__item-value"> {{ resultSirene.siren }}</div></div>
    <div class="company__item"><label class="company__item-key">Clef NIC</label><div class="company__item-value"> {{ resultSirene.nic }}</div></div>
    <div class="company__item"><label class="company__item-key">Activité principale Etablissement</label><div class="company__item-value"> {{ resultSirene.activite_principale }} - {{ resultSirene.libelle_activite_principale }}</div></div>
    <div class="company__item"><label class="company__item-key">Activité principale Entreprise</label><div class="company__item-value"> {{ resultSirene.activite_principale_entreprise }} - {{ resultSirene.libelle_activite_principale_entreprise }}</div></div>
    <div class="company__item"><label class="company__item-key">Nature juridique</label><div class="company__item-value"> {{ resultSirene.libelle_nature_juridique_entreprise | ifExist }}</div></div>
    <div class="company__item"><label class="company__item-key">Numéro RNA</label><div class="company__item-value"> {{ resultSirene.numero_rna | ifExist }}</div></div>
    <div class="company__item"><div class="company__item-key">
      N° TVA Intracommunautaire <img class="info__icon" v-tooltip.bottom="'Valeur indicative calculée depuis le SIREN.'" src="/src/assets/img/icons/question_mark.svg"></div>
    <div class="company__item-value"> {{ tvaIntracommunautaire }}</div></div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters'

export default {
  name: 'EtablissementSireneInfo',
  computed: {
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    tvaIntracommunautaire () {
      const tvaKey = (12 + 3 * (this.resultSirene.siren % 97)) % 97
      const tvaNumber = `${tvaKey}${this.resultSirene.siren}`
      return `FR${tvaNumber}`
    }
  },
  mixins: [Filters]
}
</script>
<<<<<<< 153e4ae78a3f7b3a187fa48163dc2211d32a8c2a
=======

<style lang="scss" scoped>
  .info__icon {
    position: relative;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
  }

  .info__icon:hover {

  }

  .panel {
    border: 2px solid $color-lighter-blue;
    // border: 2px $color-light-pink solid;
  }
</style>
>>>>>>> WIP - Added tooltip system
