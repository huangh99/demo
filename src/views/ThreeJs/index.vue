<template>
  <div class="menu">
    <ul class="menu-list">
      <li class="list-item" @click="handleClick(item.path)" v-for="(item, index) in state.menuList" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({
  menuList: [{
    name: 'part1',
    path: '/three/part1'
  }, {
    name: 'part2',
    path: '/three/part2'
  // }, {
  //   name: 'canvas基础',
  //   path: '/canvas-base'
  // }, {
  //   name: 'canvas动画',
  //   path: '/canvas-animation'
  // }, {
  //   name: 'markdown编辑器',
  //   path: '/markdown-editor'
  }]
})

function handleClick(path){
  router.push(path)
}

</script>

<style scoped>
.menu-list{
  display: flex;
  justify-content: center;
  gap: 20px;
}
.list-item{
  cursor: pointer;
}
.list-item:hover{
  color: blue;
}
</style>
