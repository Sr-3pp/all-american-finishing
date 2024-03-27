<template lang="pug">
.aaf-forming-break
    ul.aaf-forming-break-menu
        li.aaf-forming-break-item(v-for="(item, i) in shapes[0].angles" :key="i")
            button(@click="angleHandler(item.bone, -.1)") -
            p {{ item.name }}
            button(@click="angleHandler(item.bone, +.1)") +
        li.aaf-forming-break-item(v-for="([key,value], i) in Object.entries(shapes[0].scale)" :key="i")
            button(@click="scaleHandler(key, -.1)") -
            p {{ key }}
            button(@click="scaleHandler(key, +.1)") +
    ClientOnly 
    .aaf-forming-canvas-container(ref="canvas")
</template>

<script lang="ts" setup>
import { FBChannel, FBSheet } from "@/assets/ts/shapes";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const app: any = useNuxtApp();

const loader = new GLTFLoader();
const loads = await loader.loadAsync("/models/channel.gltf");
const model = loads.scenes[0].children[0];

model.children[0].material = new app.$THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

let canvas: any = ref(null);
let camera: any;
const scene = markRaw(new app.$THREE.Scene());

let renderer: any;

let mesh: any;

const mouse = new app.$THREE.Vector2();
const raycaster = new app.$THREE.Raycaster();

let intersects: any;

const shapes = [
  {
    name: "channel",
    angles: [
      {
        name: "angle A",
        bone: "rightBone",
        value: 0,
      },
      {
        name: "angle B",
        bone: "leftBone",
        value: 0,
      },
    ],
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
];

const animate = () => {
  requestAnimationFrame(animate);
  //mesh.rotation.x += 0.01
  //mesh.rotation.y += 0.01
  renderer.render(scene, camera);
};

const setMesh = (kind: string) => {
  if (!mesh) {
    mesh = new FBChannel({
      width: 3,
      height: 3,
      segments: { x: 4, y: 3, z: 4 },
    }).mesh;
    scene.add(mesh);
  } else if (mesh.name !== kind) {
    //quitar mesh y poner nueva
    scene.remove(mesh);
    mesh = new FBSheet({
      width: 1,
      height: 1,
      segments: { x: 3, y: 3, z: 1 },
    }).mesh;
    scene.add(mesh);
  }
};
const rayHandler = ({ clientX, clientY }: MouseEvent) => {
  const raycaster = new app.$THREE.Raycaster();
  const mouse: any = {};
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(model.children, true);
};
const angleHandler = (bone_name: string, value: number) => {
  const bone = model.getObjectByName(bone_name);
  bone.rotation.z += value;
};
const scaleHandler = (vector: string, value: number) => {
  model.scale[vector] += value;
};

onMounted(() => {
  const height = window.innerHeight > 500 ? 500 : window.innerHeight;

  camera = new app.$THREE.PerspectiveCamera(
    75,
    canvas.value.offsetWidth / height,
    0.1,
    1000
  );

  camera.position.set(0, 0, -5);
  camera.lookAt(0, 0, 0);

  renderer = new app.$THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(canvas.value.offsetWidth, height);
  canvas.value.appendChild(renderer.domElement);

  const ambientLight = new app.$THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.position.set(0, 3, 0);

  scene.add(model, ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.update();
  renderer.domElement.addEventListener("click", rayHandler, false);

  animate();
});
</script>

<style lang="scss">
.aaf-forming-break {
  &-menu {
    display: flex;
  }

  &-item {
    display: flex;
  }
}

.aaf-three {
  button {
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
  }

  canvas {
    position: relative;
    z-index: 20;
    background-color: $color-black;
  }
}
</style>
