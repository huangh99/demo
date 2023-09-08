<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="circle"></div>
      <ul class="bubble-wrapper">
        <li class="bubble-item" v-for="item in 200" :key="item"></li>
      </ul>
    </div>

    <div class="test">
      <div class="test1"></div>
      <div class="test2"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
$headColor: hsl(130, 75%, 75%);
$endColor: hsl(60, 75%, 40%);

.content-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: grid;
  place-content: center;
  filter: blur(3px) contrast(3);
}

.container {
  position: relative;
  padding: 100px;
  background-color: #000;
  animation: hueRotate 8s linear infinite;
}

.circle {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: conic-gradient($headColor 0,
      $headColor 10%,
      hsl(120, 75%, 70%),
      hsl(110, 75%, 65%),
      hsl(100, 75%, 60%),
      hsl(90, 75%, 55%),
      hsl(80, 75%, 50%),
      hsl(70, 75%, 45%),
      $endColor 30%,
      $endColor 35%,
      transparent 35%);
  mask: radial-gradient(transparent,
      transparent 119px,
      #000 120px,
      #000 120px,
      #000 100%);
  -webkit-mask: radial-gradient(transparent,
      transparent 119px,
      #000 120px,
      #000 120px,
      #000 100%);
  animation: rotate 4s linear -1400ms infinite;

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 30px;
    height: 30px;
    background: $headColor;
    top: 0;
    left: 135px;
    border-radius: 50%;
  }

  &::after {
    background: $endColor;
    left: unset;
    top: 214px;
    right: 26px;
  }
}

.bubble-wrapper {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bubble-item {
  position: absolute;
  border-radius: 50%;
  background: hsl(60, 75%, 40%);
  inset: 0;
}

$count: 200;

@for $i from 1 through $count {

  .bubble-item:nth-child(#{$i}) {
    $delayTime: calc(4000 *($i / $count) * -1ms);
    --rotate: calc(360 / #{$count} * #{$i} * 1deg);
    --scale: #{0.4 + calc(random(10) / 10)};
    --x: #{-100 + random(200)}px;
    --y: #{-100 + random(200)}px;
    transform: rotateZ(var(--rotate)) translate(135px, 0);
    opacity: 1;
    animation: showHide 4s linear $delayTime infinite;
  }
}

@keyframes showHide {
  0% {
    transform: rotateZ(var(--rotate)) translate(135px, 0);
    opacity: 0;
  }

  75% {
    opacity: 0;
  }

  75.1% {
    transform: rotateZ(var(--rotate)) translate(135px, 0) scale(var(--scale));
    opacity: 1;
  }

  100% {
    transform: rotateZ(var(--rotate)) translate(calc(135px + var(--x)), var(--y)) scale(.2);
    opacity: 0;
  }
}

@keyframes hueRotate {
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(-360deg);
  }
}
</style>
