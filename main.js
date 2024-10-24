import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const canvas = document.getElementById('canvas');

// 1.Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// 2.Camera

const camera = new THREE.PerspectiveCamera(75,  window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3.Object
 
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585',emissive:'#468585'});
const dodecahedron = new THREE.Mesh(geometry, material);

// second object
// emissive parameter can not be used with basic material
const BoxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const BoxMaterial = new THREE.MeshBasicMaterial({ color: '#B4B4B3' });
const box = new THREE.Mesh(BoxGeometry, BoxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// 4.Light
const ambientLight = new THREE.AmbientLight(0x006769, 100);
ambientLight.position.set(1, 1, 1);
scene.add(ambientLight);

//5.Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//6. Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//7.Animation
function animate() {

  requestAnimationFrame(animate);
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;

  box.rotation.y += 0.01;
 
  controls.update();
 
  renderer.render(scene, camera);
  
}

// 8. Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
});

animate();