<template>
  <div class="video-player-container">
    <div class="filter">
      <input type="text" v-model="value"> <button @click="play">播放</button>
    </div>
    <div class="video-wrapper">
      <div class="video-box">
        <video :src="video.url" style="width:100%; height:100%; object-fit: fill;" controls muted autoplay></video>
      </div>
      <div class="video-box" v-for="item in 8"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const value = ref('')

const video = reactive({
  url:''
})

function play(){
  video.url = value.value
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
