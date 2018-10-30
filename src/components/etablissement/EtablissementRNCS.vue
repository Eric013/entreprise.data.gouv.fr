<template>
  <div class="company">
    <section class="etablissement__section-grey">
      <!-- <div class="container company-container company-container__header">
        <etablissement-rncs-header />
      </div> -->
      <div class="container company-container">
        <etablissement-rncs-identification/>
        <etablissement-rncs-activity/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-gestion-physique/>
        <etablissement-rncs-gestion-morale/>
      </div>
      <div class="container company-container">
        <etablissement-rncs-observations/>
      </div>
   </section>
  </div>
</template>

<script>
import EtablissementRNCSHeader from '@/components/etablissement/etablissementRNCS/EtablissementRNCSHeader'
import EtablissementRNCSIdentification from '@/components/etablissement/etablissementRNCS/EtablissementRNCSIdentification'
import EtablissementRNCSGestionPhysique from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionPhysique'
import EtablissementRNCSGestionMorale from '@/components/etablissement/etablissementRNCS/EtablissementRNCSGestionMorale'
import EtablissementRNCSActivity from '@/components/etablissement/etablissementRNCS/EtablissementRNCSActivity'
import EtablissementRNCSObservations from '@/components/etablissement/etablissementRNCS/EtablissementRNCSObservations'

export default {
  name: 'EtablissementRNCS',
  components: {
    'EtablissementRncsHeader': EtablissementRNCSHeader,
    'EtablissementRncsIdentification': EtablissementRNCSIdentification,
    'EtablissementRncsGestionPhysique': EtablissementRNCSGestionPhysique,
    'EtablissementRncsGestionMorale': EtablissementRNCSGestionMorale,
    'EtablissementRncsActivity': EtablissementRNCSActivity,
    'EtablissementRncsObservations': EtablissementRNCSObservations,
  }
}
</script>