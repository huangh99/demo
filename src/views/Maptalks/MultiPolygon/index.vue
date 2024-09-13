<template>
  <div class="map" id="map"></div>
</template>
<script setup>
import * as maptalks from 'maptalks';
import {  PolygonLayer,GroupGLLayer  } from '@maptalks/gl-layers'
import { onMounted, reactive } from 'vue'
import jsonData from './feature.json'

let map = null
let layer = null
let focus = null

function initMap() {
  map = new maptalks.Map('map', {
    center: [122.816913, 39.338630000000023],
    zoom: 15,
    maxZoom: 18,
    minZoom: 1,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });

  const group = new GroupGLLayer('group').addTo(map);
  layer = new PolygonLayer('layer', {}).addTo(group);
  // layer = new maptalks.VectorLayer('layer', {}).addTo(map);
  initPolygon()
}

function initPolygon() {
  maptalks.GeoJSON.toGeometry(jsonData, geo => {
    geo.setSymbol([
      {
        lineColor: geo.type=='MultiPolygon'? '#ff0000':'#ffff00',
        lineWidth: 1,
        lineDasharray: [2, 1, 2], // 线形
        lineOpacity: 1,
        polygonOpacity: 0.5,
        polygonFill: geo.type=='MultiPolygon'? '#ff0000':'#ffff00'
      },
    ])
    geo.on('click',()=>{
      // geo.flash(400,10)
      geo.hide()
      map.animateTo({
        zoom: 13,
        center: [-74.08087539941407, 40.636167734187026],
          // pitch: 0,
          // bearing: 20
        }, {
          duration: 5000
        });
    })
    layer.addGeometry(geo)
  })
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
