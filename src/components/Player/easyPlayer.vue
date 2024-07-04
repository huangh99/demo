<template>
  <EasyPlayer
    :videoUrl="url"
    live
    stretch
  ></EasyPlayer>
</template>

<script setup>
import EasyPlayer from '@easydarwin/easyplayer'
import { onMounted,onUnmounted } from 'vue'



const props = defineProps({
  url: String,
  type: String
})



onMounted(()=>{
})

onUnmounted(()=>{

})



</script>



<style scoped>
</style>
