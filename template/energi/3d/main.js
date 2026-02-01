import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const tooltip = document.getElementById('tooltip');
const ttRoom = document.getElementById('tt-room');
const ttStatus = document.getElementById('tt-status');
const ttTitle = document.getElementById('tt-title');
let movingBox;
let boxDirection = 1;   // 1 = maju, -1 = mundur


if (!tooltip || !ttRoom) {
  console.error('Tooltip element NOT found');
}
// const tooltip = document.getElementById('tooltip');


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
      obj.userData.status = 'offline';
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
  setRoomStatus('Object_5', 'alarm');
  setRoomStatus('Object_3', 'warning')
});
let mixer;
loader.load('walking.glb', (gltf) => {
  console.log('Animations:', gltf.animations);
  movingBox = gltf.scene;
  movingBox.scale.set(100, 100, 100);
  movingBox.position.set(-1500, 175, 2000);
  movingBox.rotation.y = 90 * Math.PI / 180;
  scene.add(movingBox);
  if (gltf.animations && gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(movingBox);

    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });

    console.log('GLB animation started');
  }
});
// function createMovingBox() {
//   const geometry = new THREE.BoxGeometry(80, 40, 80);
//   const material = new THREE.MeshStandardMaterial({
//     color: 0x2196f3
//   });

//   movingBox = new THREE.Mesh(geometry, material);
//   movingBox.position.set(0, 300, 2000); // posisi awal
//   movingBox.castShadow = true;

//   // OPTIONAL: supaya bisa kena raycaster / tooltip
//   movingBox.userData = {
//     status: 'normal',
//     type: 'vehicle'
//   };

//   scene.add(movingBox);
// }

// createMovingBox();


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

  room.userData.status = status;

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
// setTimeout(() => setRoomStatus('Object_2', 'alarm'), 500);
// setTimeout(() => setRoomStatus('Object_3', 'warning'), 4000);
setTimeout(() => setRoomStatus('Object_4', 'offline'), 6000);
setTimeout(() => setRoomStatus('Object_2', 'normal'), 8000);

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
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  
  if (mixer) mixer.update(delta);
  

  // GERAK BOX
  if (movingBox) {
    movingBox.position.x += boxDirection * 120 * delta;
    // Batas bolak-balik
    if (movingBox.position.x > 0) {
      boxDirection = -1;
      movingBox.rotation.y = 270 * Math.PI / 180;
    }
    if (movingBox.position.x < -1500) {
      boxDirection = 1;
       movingBox.rotation.y = 90 * Math.PI / 180;
    }
    
    // sedikit rotasi biar hidup
    // movingBox.rotation.y += 1 * delta;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    clock.getDelta(); // reset lonjakan
    // console.log('Clock reset after tab active');
  }
});

function positionTooltip(x, y) {
  const padding = 12;

  tooltip.style.left = '0px';
  tooltip.style.top = '0px';
  tooltip.style.display = 'block';

  const rect = tooltip.getBoundingClientRect();

  let left = x + 14;
  let top = y + 14;

  if (left + rect.width > window.innerWidth) {
    left = x - rect.width - padding;
  }

  if (top + rect.height > window.innerHeight) {
    top = y - rect.height - padding;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}



window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(
    Object.values(rooms),
    false
  );

  if (hits.length > 0) {
    const obj = hits[0].object;

    if (obj.userData.status === 'alarm') {
      ttTitle.textContent = "ALARM";
      ttTitle.style.color = "#ff3b30";
      ttRoom.textContent = obj.name;
      ttStatus.textContent = "High Temp";
      positionTooltip(event.clientX, event.clientY);
      tooltip.style.display = 'block';
      requestAnimationFrame(() => {
        tooltip.classList.add('show');
      });
      document.body.style.cursor = 'pointer';
      return;
    } else if (obj.userData.status === "warning") {
      ttTitle.textContent = "WARNING";
      ttTitle.style.color = "#FFC107";
      ttRoom.textContent = obj.name;
      ttStatus.textContent = "Warning Temp";
      positionTooltip(event.clientX, event.clientY);
      tooltip.style.display = 'block';
      requestAnimationFrame(() => {
        tooltip.classList.add('show');
      });
      document.body.style.cursor = 'pointer';
      return;
    }
    else if (obj.userData.status === "normal") {
      ttTitle.textContent = "NORMAL";
      ttTitle.style.color = "#4CAF50";
      ttRoom.textContent = obj.name;
      ttStatus.textContent = "Normal";
      positionTooltip(event.clientX, event.clientY);
      tooltip.style.display = 'block';
      requestAnimationFrame(() => {
        tooltip.classList.add('show');
      });
      document.body.style.cursor = 'pointer';
      return;
    }
  }

  tooltip.classList.remove('show');
  document.body.style.cursor = 'default';

});