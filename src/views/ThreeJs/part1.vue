<template>
  <div id="three-dom" ref="threeDom"></div>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({

})

const threeDom = ref(null)

function initThree(){
  // 创建一个三维场景
  const scene = new THREE.Scene()
  // 创建一个相机（透视摄像机）
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  // 创建一个渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias:true,
  });
  // 设置渲染器的大小
  renderer.setSize(threeDom.value.clientWidth, threeDom.value.clientHeight);
  // 设置渲染画面添加到指定元素中进行渲染
  threeDom.value.appendChild(renderer.domElement);

  // 创建一个长宽高为1个单位的立方体
  const geometry = new THREE.BoxGeometry(1,1,1)
  // 创建网格材质
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // 颜色
    specular: 0x444444, //高光部分的颜色
  })
  // 创建一个网格模型对象
  const cube = new THREE.Mesh(geometry,material)
  // 将网格模型对象添加到三维场景中
  scene.add(cube)

  const material1 = new THREE.MeshLambertMaterial({
    color: 0x00ff00 // 颜色
  })
  const sphere = new THREE.SphereGeometry(1);
  const cube1 = new THREE.Mesh(sphere,material1)
  cube1.position.set(3,0,0)
  scene.add(cube1)
  // 设置相机的位置
  camera.position.set(0,1,5)


  // 7.创建光源
  const spotLight1 = new THREE.SpotLight(0xffffff, 10); //(光照颜色, 光照强度)
  // 设置光源位置
  spotLight1.position.set(2, 2, 3);
  scene.add(spotLight1);

  // 8.为了方便观察3D图像，添加三维坐标系对象
  const axes = new THREE.AxesHelper(8); // 坐标系轴长设置为8
  // 把三维坐标系 添加到场景中
  scene.add(axes);

  let control = new OrbitControls(camera, renderer.domElement);

  function render() {
    //循环调用
    requestAnimationFrame(render);
    //渲染
    renderer.render(scene, camera);
  }
  render();
}

onMounted(() => {
  initThree()
})
</script>



<style scoped>
#three-dom{
  width: 100%;
  height: 100vh;
}
</style>
