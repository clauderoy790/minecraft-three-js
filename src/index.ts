import {
  BackSide,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Player } from './player';

const scene = new Scene();
const cam = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 2000);
cam.position.z = 5;
const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new PlaneGeometry(1, 1);
const material = new MeshBasicMaterial({ color: 0xffff00 });
const plane = new Mesh(geometry, material);

scene.add(plane);

const box = new BoxGeometry(100, 100, 100);
const skyMat = new MeshBasicMaterial({ color: 0x6f81aa, wireframe: false });
skyMat.side = BackSide;
const skybox = new Mesh(box, skyMat);
scene.add(skybox);

// const light = new AmbientLight(0x404040);
// scene.add(light);

// const canvas = document.createElement('CANVAS');
// canvas.setAttribute('class','canvas')
// document.body.append(canvas);
console.log('salut');

const stats = Stats();
document.body.appendChild(stats.dom);
const player = new Player(cam);

function animate() {
  requestAnimationFrame(animate);
  player.update()
  const val = 0.01;
  plane.rotation.x += val;
  plane.rotation.y += val;
  renderer.render(scene, cam);
  stats.update();
}

animate();
