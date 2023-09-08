<template>
  <div class="content-wrapper" id="editor">
    <mavon-editor style="height: 100%"></mavon-editor>
  </div>
</template>

<script setup>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { reactive, onMounted, onUnmounted } from 'vue'
const state = reactive({

  currentList: [],
  timer1: null,
  timer2: null
})







onMounted(() => {

})

onUnmounted(() => {

})


</script>

<style>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>