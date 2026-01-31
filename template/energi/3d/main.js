import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// =======================
// CONSTANT
// =======================
const STATUS_COLOR = {
  normal: 0x4caf50,
  warning: 0xffc107,
  alarm: 0xf44336,
  offline: 0x9e9e9e
};

const rooms = {};
const alarmTimers = {};
/* =========================
   AKTIFKAN THREE CACHE
   ========================= */
THREE.Cache.enabled = true;

// =======================
// SCENE SETUP
// =======================
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

// =======================
// CONTROLS
// =======================
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// =======================
// LIGHTING
// =======================
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// =======================
// LOAD MODEL
// =======================
const loader = new GLTFLoader();
let defaultCameraPos = new THREE.Vector3();
let defaultTarget = new THREE.Vector3();
let defaultZoom;


loader.load('musik_school.glb', (gltf) => {
  const model = gltf.scene;

  model.traverse(obj => {
    if (obj.isMesh) {
      obj.material = obj.material.clone();
      rooms[obj.name] = obj;
      setRoomStatus(obj.name, 'offline');
      console.log('Room loaded:', obj.name);
    }
  });

  scene.add(model);

  // AUTO FIT
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  model.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  camera.position.set(maxDim * 0.3, maxDim * 0.3, maxDim * 0.8);

  camera.near = maxDim / 100;
  camera.far = maxDim * 100;
  camera.updateProjectionMatrix();


  controls.target.set(-500, 0, 0);

  // controls.setPolarAngle(
  //   controls.getPolarAngle() - THREE.MathUtils.degToRad(180)
  // );

  controls.update();
  // SIMPAN DEFAULT VIEW
  defaultCameraPos.copy(camera.position);
  defaultTarget.copy(controls.target);
  defaultZoom = camera.zoom;
});

function resetViewSmooth() {
  const duration = 600;
  const start = performance.now();

  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();

  function animateReset(t) {
    const p = Math.min((t - start) / duration, 1);
    camera.position.lerpVectors(startPos, defaultCameraPos, p);
    controls.target.lerpVectors(startTarget, defaultTarget, p);
    controls.update();
    if (p < 1) requestAnimationFrame(animateReset);
  }

  requestAnimationFrame(animateReset);
}

document.getElementById('resetView').onclick = resetViewSmooth;


// =======================
// ROOM STATUS HANDLER
// =======================
function setRoomStatus(roomName, status) {
  const room = rooms[roomName];
  if (!room) return;

  // Stop blinking if exists
  if (alarmTimers[roomName]) {
    clearInterval(alarmTimers[roomName]);
    delete alarmTimers[roomName];
  }

  if (status === 'alarm') {
    startAlarmBlink(roomName);
  } else {
    room.material.color.setHex(STATUS_COLOR[status]);
  }
}

// =======================
// ALARM BLINK EFFECT
// =======================
function startAlarmBlink(roomName) {
  let on = false;
  alarmTimers[roomName] = setInterval(() => {
    on = !on;
    rooms[roomName].material.color.setHex(
      on ? 0xff0000 : 0x550000
    );
  }, 500);
}

// =======================
// DEMO SIMULATION (HAPUS NANTI)
// =======================
setTimeout(() => setRoomStatus('Object_2', 'alarm'), 500);
setTimeout(() => setRoomStatus('Object_3', 'warning'), 4000);
setTimeout(() => setRoomStatus('Object_4', 'offline'), 6000);
setTimeout(() => setRoomStatus('Object_5', 'normal'), 8000);

// =======================
// RESIZE
// =======================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// =======================
// LOOP
// =======================
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
