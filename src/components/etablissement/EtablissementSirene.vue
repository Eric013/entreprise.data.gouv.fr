<template>
  <div class="company">
    <div class="company-container">
      <etablissement-sirene-contact />
      <etablissement-sirene-info />
    </div>
    <div class="company-container">
      <etablissement-sirene-children />
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneContact from '@/components/etablissement/etablissementSirene/EtablissementSireneContact'
import EtablissementSireneInfo from '@/components/etablissement/etablissementSirene/EtablissementSireneInfo'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'

export default {
  name: 'EtablissementSirene',
  components: {
    'EtablissementSireneContact': EtablissementSireneContact,
    'EtablissementSireneInfo': EtablissementSireneInfo,
    'EtablissementSireneChildren': EtablissementSireneChildren
  }
}
</script>

<style lang="scss" scoped>
  .panel + .panel {
    margin-left: 2em;
  }

  @media (max-width: $tablet) {
    .panel + .panel {
      margin-left: 0;
    }
  }
</style>
