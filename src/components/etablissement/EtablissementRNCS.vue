<template>
  <div class="company">
    <div class="company-container">
      <etablissement-rncs-identification/>
      <etablissement-rncs-activity/>
    </div>
    <div class="company-container">
      <etablissement-rncs-gestion-physique/>
      <etablissement-rncs-gestion-morale/>
    </div>
    <div class="company-container">
      <etablissement-rncs-observations/>
    </div>
  </div>
</template>

<script>
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSGestionPhysique from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionPhysique'
import EtablissementRNCSGestionMorale from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionMorale'
import EtablissementRNCSActivity from '@/components/etablissement/etablissementRNCS/EtablissementRNCSActivity'
import EtablissementRNCSObservations from '@/components/etablissement/etablissementRNCS/EtablissementRNCSObservations'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsGestionPhysique': EtablissementRNCSGestionPhysique,
    'EtablissementRncsGestionMorale': EtablissementRNCSGestionMorale,
    'EtablissementRncsActivity': EtablissementRNCSActivity,
    'EtablissementRncsObservations': EtablissementRNCSObservations,
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
