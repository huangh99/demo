<template>
  <div id="three-dom" ref="threeDom"></div>
</template>

<script setup>
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { ref, reactive, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const gui = new GUI()
const threeDom = ref(null)

gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';



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

  // 设置设备像素比
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x444444, 1); //设置背景颜色

  

  // 创建一个长宽高为1个单位的立方体
  const geometry = new THREE.BoxGeometry(1,1,1)
  // 创建网格材质
  const material = new THREE.MeshPhongMaterial({
    color: 0x00fff0, // 颜色
    specular: 0x444444, //高光部分的颜色
    shininess: 20, //高光部分的亮度，默认30
    transparent: true, // 开启透明
    opacity: 0.5, // 设置透明度
    // side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.DoubleSide, //两面可见
  })
  // 创建一个网格模型对象
  const cube = new THREE.Mesh(geometry,material)
  // 将网格模型对象添加到三维场景中
  scene.add(cube)

  // 设置相机的位置
  camera.position.set(0,1,5)


  // 7.创建光源(聚光灯光源)
  const pointLight = new THREE.PointLight(0xffffff, 10); //(光照颜色, 光照强度)
  // 设置光源位置
  pointLight.position.set(2, 2, 3);
  scene.add(pointLight);

  gui.add(pointLight, 'intensity', 0, 2.0).name('点光源强度').step(0.1)
  gui.add(camera.position, 'x', 0, 10);
  gui.addColor(pointLight, 'color').onChange((value)=>{
    console.log(value);
  })






  // 8.为了方便观察3D图像，添加三维坐标系对象
  const axes = new THREE.AxesHelper(8); // 坐标系轴长设置为8
  // 把三维坐标系 添加到场景中
  scene.add(axes);

  let control = new OrbitControls(camera, renderer.domElement);
  control.target.set(10,0,0)


  function render() {
    //渲染循环调用
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();

  window.onresize = ()=>{
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
  }
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
