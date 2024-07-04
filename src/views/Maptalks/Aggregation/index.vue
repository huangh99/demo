<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import * as maptalks from 'maptalks';
import Supercluster from 'supercluster'
import { onMounted, reactive } from 'vue'
import jsonData from './places.json'

let map = null
let layer = null
let index_main = null
let points = []


function initMap(path){
  map = new maptalks.Map('map', {
    center: [51.258313644180184, 11.822028799226407],
    zoom: 2,
    maxZoom:18,
    minZoom:1,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ['a','b','c','d'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });

  layer = new maptalks.VectorLayer('layer', {
    // 'collision': true,
    // 'collisionDelay': 250,
    // 'forceRenderOnMoving': true,
    // 'forceRenderOnZooming': true,
    // 'forceRenderOnRotating': true,
    // debug:true
  }).addTo(map);

  map.on("viewchange", viewChange)

  initPoint()
}

function randomCoordinates() {
  const coordinates = [];
  const center = map.getCenter();
  const x = center.x, y = center.y;
  while (coordinates.length < 1000) {
    const lng = x + Math.random() - 0.5, lat = y + Math.random() * 0.6 - 0.3;
    coordinates.push([lng, lat]);
  }
  return coordinates;
}

function initPoint(){
  points = randomCoordinates().map(function (c, index) {
    const point = new maptalks.Marker(c, {
      zIndex: 2000 - index,
      symbol: {
        markerType: "ellipse",
        markerFill: "#ff0000cc",
        markerFillOpacity: 0.8,
        markerLineWidth: 2,
        markerLineColor: "#fff",
        markerWidth: 40,
        markerHeight: 40,
        textName: index,
        textSize: 14,
        textDy: 0,
        textFill: '#fff'
      }
    });
    return JSON.parse(JSON.stringify(point)).feature

  });



  index_main = new Supercluster({radius: 40, maxZoom: 20});
  index_main.load(points);
}

function viewChange(){
  layer.clear()
  
  const extent=map.getExtent()
  const {xmin,xmax,ymin,ymax} = extent
  const zoom= parseInt(map.getZoom())
  const data = index_main.getClusters([xmin,ymin,xmax, ymax ], zoom);

  data.forEach(item=>{

    maptalks.GeoJSON.toGeometry(item,geo=>{
      geo.setSymbol({
        markerType: "ellipse",
        markerFill: geo.properties? "#ff0000cc" : "#00ffee",
        markerFillOpacity: 0.8,
        markerLineWidth: 2,
        markerLineColor: "#fff",
        markerWidth: 40,
        markerHeight: 40,
        textName: geo.properties? geo.properties.point_count:1 ,
        textSize: 14,
        textDy: 0,
        textFill: '#fff'
      })
      geo.addTo(layer)
    })
  })
}

onMounted(()=>{
  initMap()
})
</script>



<style scoped>
#map{
  width: 100%;
  height: 100vh;
}
</style>
