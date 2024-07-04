<template>
  <div class="xgplayer" id="xgplayer"></div>
</template>

<script setup>
import { onMounted,onUnmounted } from 'vue'
import Player from 'xgplayer';
import FlvPlugin from 'xgplayer-flv'
import HlsPlugin from 'xgplayer-hls'
import Mp4Plugin from "xgplayer-mp4"
import 'xgplayer/dist/index.min.css';


const props = defineProps({
  url: String,
  type: String
})

let player = null

const options = {
  id: 'xgplayer',
  url: '',
  height: '100%',
  width: '100%',
  plugins: [],
  autoplay: true // 自动播放
}

onMounted(()=>{
  initPlay()
})

onUnmounted(()=>{
  if (player) {
    player.destroy() // 销毁播放器
    player = null // 将实例引用置空
  }
})


function initPlay() {
  options.url = props.url
  switch (props.type) {
    case 'mp4':
      options.plugins = [Mp4Plugin]
      break;
    case 'flv':
      options.plugins = [FlvPlugin]
      break;
    case 'm3u8':
      options.plugins = [HlsPlugin]
      break;
  
    default:
      options.plugins = []
      break;
  }
  player = new Player(options);
}


</script>



<style scoped>
</style>
