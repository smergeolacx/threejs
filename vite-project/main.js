import './style.css' 
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//scene
const scene = new THREE.Scene() 

//sphere
const geometry = new THREE.SphereGeometry(3, 64, 64) 
const material = new THREE.MeshStandardMaterial(
 {
   color: "#00ff83",
 }
)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
} 

//should create mesh of geometry and material add mesh to scene
const mesh = new THREE.Mesh(geometry,material) 
scene.add(mesh) 

//light should also be added
const light = new THREE.PointLight(0xffffff, 1, 100) 
light.position.set(0, 10, 10) 
scene.add(light) 

//to view one must add a camera, imagine this as blender to make sense.
//use a simple perspective camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height) 
camera.position.z = 20 
scene.add(camera) 

//rendering
const canvas = document.querySelector(".webgl")

//controls
const controls = new OrbitControls(camera, canvas)
  
const renderer = new THREE.WebGLRenderer({canvas}) 
renderer.setSize(sizes.width, sizes.height) 
renderer.render(scene,camera) 

window.addEventListener("resize", ()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix() 
  renderer.setSize(sizes.width, sizes.height) 
})

const loop = () => {
  renderer.render(scene, camera) 
  window.requestAnimationFrame(loop) 
}

loop() 