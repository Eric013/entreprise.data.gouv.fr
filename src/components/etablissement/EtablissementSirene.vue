<template>
  <div class="company">
    <section class="etablissement__section-grey">
      <!-- <div class="container company-container company-container__header">
        <etablissement-sirene-header />
      </div> -->
      <div class="container company-container">
        <etablissement-sirene-contact />
        <etablissement-sirene-info />
      </div>
      <!-- <div class="container company-container">
        <etablissement-sirene-children />
      </div> -->
    </section>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneHeader from '@/components/etablissement/etablissementSirene/EtablissementSireneHeader'
import EtablissementSireneContact from '@/components/etablissement/etablissementSirene/EtablissementSireneContact'
import EtablissementSireneInfo from '@/components/etablissement/etablissementSirene/EtablissementSireneInfo'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'

export default {
  name: 'EtablissementSirene',
  components: {
    'EtablissementSireneHeader': EtablissementSireneHeader,
    'EtablissementSireneContact': EtablissementSireneContact,
    'EtablissementSireneInfo': EtablissementSireneInfo,
    'EtablissementSireneChildren': EtablissementSireneChildren
  }
}
</script>