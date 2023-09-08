<template>
  <div class="content-wrapper">
    <button @click="addSpeech">添加语音</button>
    <ul>
      <li v-for="(item, index) in state.currentList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
const state = reactive({
  originList: ['细雨湿流光', '芳草年年与恨长', '烟锁凤楼无限事', '茫茫', '鸾镜鸳衾两断肠', '魂梦任悠扬', '睡起杨花满绣床', '薄悻不来门半掩', '斜阳', '负你残春泪几行'],
  currentList: [],
  timer1: null,
  timer2: null
})

const speakVoice = (text) => {
  const speech = new SpeechSynthesisUtterance(); // 初始化
  speech.text = text;
  speech.lang = "zh"; // 音种
  speech.volume = 2; // 音量
  speech.rate = 0.8; // 音速
  speech.pitch = 1; // 音调
  speechSynthesis.speak(speech); // 添加到语音队列中播放
}

const startTimer = () => {
  if (!state.timer1) {
    state.timer1 = setInterval(() => {
      addSpeech()
    }, 5000)
  }
}

const addSpeech = () => {
  if (state.originList[0]) {
    speakVoice(state.originList[0])
    state.currentList.push(state.originList[0])
    state.originList.shift()
  }
}

onMounted(() => {
  // state.timer2 = setTimeout(startTimer, 5000)
})

onUnmounted(() => {
  if(state.timer1){
    clearInterval(state.timer1)
  }
  if(state.timer2){
    clearTimeout(state.timer2)
  }
})


</script>

<style></style>