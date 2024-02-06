<template>
  <div class="video-player-container">
    <div class="filter">
    <t-space align="center">
      <t-input v-model="value" placeholder="请输入视频地址" style="width: 500px;"/>
      <t-select v-model="video.type">
        <t-option key="mp4" label="mp4" value="mp4" />
        <t-option key="m3u8" label="m3u8" value="m3u8"></t-option>
        <t-option key="flv" label="flv" value="flv" />
      </t-select>
      <t-button @click="play">播放</t-button> 
      <t-button @click="clear">清空</t-button> 
    </t-space>
    </div>
    <div class="video-wrapper">
      <div class="video-box">
        <video v-if="video.url" :src="video.url" style="width:100%; height:100%; object-fit: fill;" controls muted autoplay></video>
      </div>
      <div class="video-box">
        <VideoJsPlayer v-if="video.url" :url="video.url" :type="video.type"></VideoJsPlayer>
      </div>
      <div class="video-box">
        <XgVideoPlayer v-if="video.url" :url="video.url" :type="video.type"></XgVideoPlayer>
      </div>
      <div class="video-box" v-for="item in 7"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import VideoJsPlayer from '@/components/Player/videojs.vue'
import XgVideoPlayer from '@/components/Player/xgplayer.vue'
const value = ref('')

const video = reactive({
  url:'',
  type:'mp4'
})

function play(){
  video.url = value.value
}

function clear(){
  video.url = ''
}

</script>



<style scoped>
.video-player-container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.video-player-container .filter{
  width: 100%;
  text-align: center;
}
.video-wrapper{
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: repeat(3, 30%);
  gap: 10px 10px;
  justify-content: center;
  align-content: center;
  flex: 1;
}
.video-box{
  border: 1px solid #000;
  
}
</style>
