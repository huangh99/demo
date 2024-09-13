<template>
  <div class="audio-view">
    <canvas class="canvas-content" ref="canvas" width="1500" height="300"></canvas>
    <audio ref="audio" src="audio/music.mp3" controls></audio>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const canvas = ref(null)
const audio = ref(null)

let ctx = null
let analyser = null
let isInit = false
let buffer = []

let baseColor = "hsla(26, 79%, 53%, 1)"; // 橙色
let gradient = []

const initAnalyser = () => {
  // navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
  //   if (isInit) {
  //     return
  //   }

  //   // 创建音频上下文
  //   const audioCtx = new AudioContext();
  //   // 创建音频分析器节点
  //   analyser = audioCtx.createAnalyser()
  //   // 设置窗口大小，窗口越大，分析结果越详细
  //   analyser.fftSize = 512
  //   buffer = new Uint8Array(analyser.frequencyBinCount)

  //   // 创建音频源
  //   const source = audioCtx.createMediaStreamSource(stream);
  //   // 音频源连接分析器节点
  //   source.connect(analyser)

  //   isInit = true
  // })


  audio.value.onplay = () => {
    if (isInit) {
      return
    }

    // 创建音频上下文
    const audioCtx = new AudioContext();
    // 创建音频分析器节点
    analyser = audioCtx.createAnalyser()
    // 设置窗口大小，窗口越大，分析结果越详细
    analyser.fftSize = 512
    buffer = new Uint8Array(analyser.frequencyBinCount)

    // 创建音频源
    const source = audioCtx.createMediaElementSource(audio.value);
    // 音频源连接分析器节点
    source.connect(analyser)
    // 连接到输出设备
    analyser.connect(audioCtx.destination);

    isInit = true
  }
}

const draw = () => {

  if (canvas.value.getContext) {
    ctx = canvas.value.getContext('2d')
    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height);
    const blockWidth = 5
    const blockHeight = 5
    const radius = 2
    const space = 1

    const data = buffer
    for (let i = 0; i < Math.floor(data.length * 2 / 3); i++) {
      const count = Math.floor((height - 50) / (blockHeight + 1) * data[i] / 255)
      for (let j = 0; j < count; j++) {
        ctx.fillStyle = gradient[j]
        drawRoundedRect(i * (blockWidth + space), height - (j * (blockHeight + space)), blockWidth, blockHeight, radius)

      }
    }

  }
}

const generateGradient = (baseColor, count) => {
  let hsl = baseColor.match(/hsla?\((\d+),\s*(\d+%),\s*(\d+%),\s*([\d.]+)\)/)
  let h = parseInt(hsl[1], 10) // Hue
  let s = parseInt(hsl[2], 10) // Saturation
  let l = parseInt(hsl[3], 10) // Lightness

  // 在色盘上按照数量均分，获取每个均分点的颜色
  let stepH = 360 / count;
  // 提高每个等级的亮度
  let stepL = 100 / (count + 1);

  let gradientColors = []
  for (let i = 0; i < count; i++) {
    gradientColors.push(`hsl(${h + i * stepH}, ${s}%, ${l + i * stepL}%)`)
  }

  return gradientColors;
}

const drawRoundedRect = (x, y, width, height, radius) => {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.arcTo(x + width, y, x + width, y - radius, radius)
  ctx.lineTo(x + width, y - height + radius)
  ctx.arcTo(x + width, y - height, x + width - radius, y - height, radius)
  ctx.lineTo(x + radius, y - height)
  ctx.arcTo(x, y - height, x, y - height + radius, radius)
  ctx.lineTo(x, y - radius)
  ctx.arcTo(x, y, x + radius, y, radius)
  ctx.fill()
  ctx.closePath()
}

const update = () => {
  requestAnimationFrame(update)
  if (!isInit || audio.value.paused) {
    return
  }
  analyser.getByteFrequencyData(buffer)
  draw()

}

onMounted(() => {
  gradient = generateGradient(baseColor, 100)
  initAnalyser()
  update()
})

</script>



<style scoped>
.audio-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
}

.canvas-content {
  margin: 30px;
}
</style>
