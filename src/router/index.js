import { createRouter,createWebHashHistory } from "vue-router";
const routes = [
  {
    path: '/', 
    component: () => import('@/views/index.vue')
  },
  {
    path: '/bubble-loading', 
    component: () => import('@/views/BubbleLoading/index.vue')
  },
  {
    path: '/speak-voice', 
    component: () => import('@/views/SpeakVoice/index.vue')
  },
  {
    path: '/canvas-base', 
    component: () => import('@/views/CanvasBase/index.vue')
  },
  {
    path: '/canvas-animation', 
    component: () => import('@/views/CanvasAnimation/index.vue')
  },
  {
    path: '/markdown-editor', 
    component: () => import('@/views/Markdown/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router