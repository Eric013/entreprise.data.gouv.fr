<template>
  <div v-if="mapboxglSupported" class="panel" id="map" ref="map"></div>
  <div v-else class="panel">
    <p class="panel__message">Votre navigateur ne supporte pas WebGL et ne peut pas afficher la carte de l'établissement.</p>
  </div>
</template>

<script>
import Vue from 'vue'
import mapboxgl from 'mapbox-gl'
import mapOtherMarkers from '@/components/mixins/mapOtherMarkers'
import colors from '@/components/mixins/colors'

export default {
  name: 'EtablisssementSireneMap',
  props: ['positionEtablissement', 'etablissement'],
  data () {
    return {
      mapboxglSupported: mapboxgl.supported(),
      mapTilesEtalab: 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json',
      mapOptions (json) {
        return {
          container: 'map',
          style: json.body,
          center: this.positionEtablissement,
          zoom: 13
        }
      },
      etablissementPopup: new mapboxgl.Popup({
        closeButton: true
      })
    }
  },
  mounted () {
    Vue.http.get(this.mapTilesEtalab).then((json) => { this.initMap(json) })
  },
  methods: {
    initMap: async function (json) {
      let map = await new mapboxgl.Map(this.mapOptions(json))
      // addOtherMarkets first so the etablissement marker will be on top
      this.addOtherMarkers(map, this.etablissement.siret)
      this.addEtablissementMarker(map)
      mapOtherMarkers.methods.addPopupContent(this.etablissementPopup, this.etablissement)
    },
    addEtablissementMarker (map) {
      new mapboxgl.Marker({color: colors.red})
        .setLngLat(this.positionEtablissement)
        .setPopup(this.etablissementPopup)
        .addTo(map)
    }
  },
  mixins: [mapOtherMarkers]
}
</script>

<style lang="scss" scoped>
  #map {
    padding: 0;
    height: 350px;
    min-width: 50%;
  }

  .panel__message {
    color: $color-dark-grey
  }

  .mapboxgl-popup {
    max-width: 200px;
  }

</style>
