<template>
  <video
    ref="videoJsPlayer"
    class="video-js"
    id="video-player"
    @timeupdate="timeupdate"
    style="width: 100%; height: 100%; object-fit: fill;">
  </video>
</template>

<script setup>
import { ref,onMounted,onUnmounted } from 'vue'
import videojs from "video.js"
import 'videojs-flvjs-es6'
import "video.js/dist/video-js.css"


const props = defineProps({
  url: String
})

const videoJsPlayer = ref(null)
const player = ref(null)

let options = {
  muted: true, // 静音
  controls: false, // 进度条
  autoplay: true, // 自动播放
  loop: true, // 是否循环
  language: 'zh-CN', // 汉化
  preload: 'auto' // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
}

onMounted(()=>{
  initPlay()
})

onUnmounted(()=>{
  if (player.value) {
    player.value.dispose()
    player.value = null
  }
})


function initPlay() {

  if (props.url.includes('rtmp')) {
    options = {
      ...options,
      techOrder: ['html5', 'flash'], // 兼容顺序
      sources: [{ src: props.url, type: 'rtmp/flv' }]
    }
  } else if (props.url.includes('.m3u8')) {
    options = {
      ...options,
      sources: [{ src: props.url, type: 'application/x-mpegURL' }]
    }
  } else if (props.url.includes('.flv')) {
    options = {
      ...options,
      techOrder: ['html5', 'flvjs'], // 兼容顺序
      flvjs: {
        mediaDataSource: {
          isLive: false,
          cors: true,
          withCredentials: false
        }
      },
      sources: [{ src: props.url, type: 'video/x-flv' }]
    }
  } else {
    options = {
      ...options,
      sources: [{ src: props.url, type: 'video/mp4' }]
    }
  }


  player.value = videojs(videoJsPlayer.value, {
    ...options
  })
}

function timeupdate(e){
  console.log(e);
}

</script>



<style scoped>
</style>
