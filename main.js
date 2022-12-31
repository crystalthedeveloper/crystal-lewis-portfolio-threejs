import './style.css'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({canvas:document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// torus geonetry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color:0xeeb609, wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

// Avatar
const crystalTexture = new THREE.TextureLoader().load('dist/assets/me.png');
const crystal = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map:crystalTexture})
);
scene.add(crystal);

function moveCamera(){
const t = document.body.getBoundingClientRect().top;
crystal.rotation.x += 0.05;
crystal.rotation.y += 0.0075;
crystal.rotation.z += 0.05;

camera.position.z = t * -0.01;
camera.position.x = t * -0.0002;
camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

//crystal.position.z = 30;
//crystal.position.setX(-10);

// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(ambientLight, pointLight);

// help tools
const lightHelper = new THREE.PointLightHelper(pointLight);
pointLight.position.set(5, 5, 5);

const gridHelper = new THREE.GridHelper(200,50);

scene.add(lightHelper, gridHelper);

// animate loop function
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    
    controls.update()
    
    renderer.render(scene, camera);
}
animate()

// sky stars function
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color:0xeeb609});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('dist/assets/AdobeStock_224237983.jpg');
scene.background = spaceTexture;