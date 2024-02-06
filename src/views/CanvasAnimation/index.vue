<template>
  <div class="canvas-wrapper">
    <canvas class="canvas-content" ref="canvas" ></canvas>
  </div>
</template>


<script setup>
import { reactive, onMounted, ref, nextTick } from 'vue'

const lineColor = {
  phase: Math.random() * Math.PI * 2,
  amplitude: 85,
  frequency: 0.0015,
  offset: 285
}

const getColor = () => {
  lineColor.phase += lineColor.frequency
  const color = lineColor.offset + Math.sin(lineColor.phase) * lineColor.amplitude
  return Math.round(color)
}

const defaultOptions = {
  friction: 0.5,
  trails: 20, // 轨迹数量
  size: 50, // 轨迹长度
  dampening: 0.25,
  tension: 0.98
}

class Line{
  constructor({spring}){
    this.spring = spring + (Math.random() * 0.1) - 0.05;
    this.friction = defaultOptions.friction + (Math.random() * 0.01) - 0.005;
    this.nodes = [];
    for (var index = 0; index < defaultOptions.size; index++) {
      const node = new Point();
      node.x = currentPoint.x;
      node.y = currentPoint.y;
      this.nodes.push(node)
    }
  }
  update(){
    let _spring = this.spring
    for (let index = 0; index < this.nodes.length; index++) {
      const current = this.nodes[index]
      if(index > 0){
        const prev = this.nodes[index - 1]
        current.dx += (prev.x - current.x) * _spring;
        current.dy += (prev.y - current.y) * _spring;
        current.dx += prev.dx * defaultOptions.dampening;
        current.dy += prev.dy * defaultOptions.dampening
      }else{
        current.dx += (currentPoint.x - current.x) * _spring
        current.dy += (currentPoint.y - current.y) * _spring
      }
      current.dx *= this.friction;
      current.dy *= this.friction;
      current.x += current.dx;
      current.y += current.dy;
      _spring *= defaultOptions.tension
    }
  }
  draw(){
    let x = this.nodes[0].x
    let y = this.nodes[0].y
    context.beginPath()
    context.moveTo(x, y)
    for (let index = 1; index < this.nodes.length - 2; index++) {
      const current = this.nodes[index]
      const next = this.nodes[index + 1]
      x = (current.x + next.x) * 0.5
      y = (current.y + next.y) * 0.5
      context.quadraticCurveTo(current.x, current.y, x, y)
    }
    const prev = this.nodes[this.nodes.length - 2]
    const last = this.nodes[this.nodes.length - 1]
    context.quadraticCurveTo(prev.x, prev.y, last.x, last.y)
    context.stroke()
    context.closePath()
  }
}

class Point{
  constructor(){
    this.x = 0
    this.y = 0
    this.dx = 0
    this.dy = 0
  }
}

const start = () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = "hsla(" + getColor() + ",90%,50%,0.25)";
  // context.strokeStyle = "hsla(" + getColor() + ",90%,50%,0.5)";
  context.lineWidth = 1;

  for (let index = 0; index < defaultOptions.trails; index++) {
    const line = lines[index]
    line.update()
    line.draw()
  }
  requestAnimationFrame(start)
}

const canvas = ref(null)
let context = null

const initCanvas = () => {
  if (canvas.value.getContext) {
    context = canvas.value.getContext('2d')
    resizeCanvas()
    document.addEventListener("mousemove", mouseMove)
  }
}

const resizeCanvas = () => {
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

const mouseMove = (event) => {
  document.removeEventListener('mousemove', mouseMove);
  document.addEventListener('mousemove', getCoordinate);
  getCoordinate(event)
  initLines()
  start()
}

const currentPoint = {
  x:0,
  y:0
}

const getCoordinate = (event) => {
  currentPoint.x = event.clientX
  currentPoint.y = event.clientY
}

let lines = []
const initLines = () => {
  lines = [];
  for (let index = 0; index < defaultOptions.trails; index++) {
    lines.push(new Line({
      spring: 0.45 + 0.025 * (index / defaultOptions.trails)
    }))
  }
}

onMounted(() => {
  initCanvas()
  window.addEventListener("resize", resizeCanvas);
})

</script>

<style scoped>
.canvas-wrapper{
  overflow: hidden;
}
.canvas-content {
  box-sizing: border-box;
}

</style>