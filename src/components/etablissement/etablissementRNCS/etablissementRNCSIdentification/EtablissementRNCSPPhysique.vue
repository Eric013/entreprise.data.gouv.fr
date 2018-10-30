<template>
  <div>
    <h4>Personne Physique</h4>
    <hr>
    <panel-info-rncs :parent="RNCSPhysical" :elements="elementsToDisplay" />
  </div>
</template>

<script>
import PanelInfoRNCS from '@/components/templates/PanelInfoRNCS'

export default {
  name: 'EtablissementRNCSPPhysique',
  components: { 'PanelInfoRncs': PanelInfoRNCS },
  data () {
    return {
      elementsToDisplay:
      {
        "activite_forain":"Non",
        "dap":"Non",
        "dap_denomination":null,
        "dap_objet":null,
        "dap_date_cloture":null,
        "eirl":"Non",
        "conjoint_collab_date_fin":null,
        "date_derniere_modification":"2011-02-18",
        "libelle_derniere_modification":"Création",
        "nom_patronyme":"LEPETIT",
        "nom_usage":"BREANT",
        "pseudonyme":null,
        "prenoms":"Corinne Raymonde Bernadette",
        "date_naissance":"1968-03-28",
        "ville_naissance":"14514 Pont l'évêque ",
        "pays_naissance":"FRANCE",
        "nationalite":"Française",
        "conjoint_collab_nom_patronyme":"BREANT",
        "conjoint_collab_nom_usage":null,
        "conjoint_collab_pseudonyme":null,
        "conjoint_collab_prenoms":"Gérald Michel Franck",
        "adresse_ligne_1":null,
        "adresse_ligne_2":"chemin d'Enfer",
        "adresse_ligne_3":null,
        "adresse_code_postal":"14130",
        "adresse_ville":"Surville",
        "adresse_code_commune":"14682",
        "adresse_pays":"FRANCE",
        "dap_adresse_ligne_1":null,
        "dap_adresse_ligne_2":null,
        "dap_adresse_ligne_3":null,
        "dap_adresse_code_postal":null,
        "dap_adresse_ville":null,
        "dap_adresse_code_commune":null,
        "dap_adresse_pays":null,
        "code_greffe":"1407",
        "numero_gestion":"2011A00030",
        "siren":"440858470"
      }
    }
  },
  computed: {
    RNCSPhysical () {
      return this.$store.getters.RNCSData.personne_physique
    }
  }
}
</script>