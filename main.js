// Selecting The Next and previous buttons

const prev = document.getElementById('prev-btn')
const next = document.getElementById('next-btn')
const list = document.getElementById('item-list')

// These are some variables which determines the speed 
const itemWidth = 150
const padding = 10

// Here we are decreasing & increasing the value of scrollLeft property to slide itemList right and left.
prev.addEventListener('click', () => {
    list.scrollLeft -= itemWidth + padding
})

next.addEventListener('click', () => {
    list.scrollLeft += itemWidth + padding
})

// Importing components required from three.js
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

// We will create 1 function and we will use it everywhere to render products

function render3D(modelPath, renderElement) { // (The model to render, The element in which model need to be rendered)

    // Setting up simple scene and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45, renderElement.clientWidth / renderElement.clientHeight, 1, 5000); // Here renderElement.clientWidth, renderElement.clientHeight are used for responsiveness, so canvas can fit in the container in which they are render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(renderElement.clientWidth, renderElement.clientHeight); // Same happening here, just to make canvas more responsive

    // When ever we call this function, this will render an element inside renderElement by this
    renderElement.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 1); // setting Black background with full intensity
    renderer.render(scene, camera);
    camera.position.set(3, 4, 3)

    // 3 Directional light on north-east, north-west, and in south position
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5); //color, intensity
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5); //color, intensity
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 5); //color, intensity
    scene.add(directionalLight1);
    scene.add(directionalLight2);
    scene.add(directionalLight3);
    directionalLight1.position.set(100, 100, 0); // North East
    directionalLight2.position.set(-100, 100, 0); // North West
    directionalLight3.position.set(0, -100, 0); // South

    // Orbits control to rotate, zoom, and other effects
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.autoRotate = true; // This will auto rotate every element rendered using this function
    orbit.autoRotateSpeed = 5;
    orbit.enableZoom = false; // We are disabling the default zoom in and zoom out effect of orbit controller because we will use TrackballControls, which are more smooth in zooming in and out
    orbit.update();

    const controls2 = new TrackballControls(camera, renderer.domElement); // For smooth zoom in and out
    controls2.noRotate = true; // We are rotating the models using default Orbit controller
    controls2.noPan = true
    controls2.noZoom = false;
    controls2.zoomSpeed = 1.5;
    controls2.minDistance = 3; // Limiting the zoom in and zoom out
    controls2.maxDistance = 20;

    // Finally we are loading the actual model with modelPath as an argunment
    // Every time modelPath will be the same but the element in which it has to be rendered will be different. 
    //If we want a different model to be rendered we can simplt pass that as an argument to the function
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltf) => {
        model = gltf.scene
        scene.add(model);
    });

    function animate() {
        // This setup is for smooth zoom in and out
        const target = orbit.target; 
        controls2.target.set(target.x, target.y, target.z);
        controls2.update();
        // Now we are updating the rotations of the models in real time
        orbit.update();
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    // To detect if someone has clicked on any product
    renderElement.addEventListener('click', () => {
        var popUp = document.getElementById('popUp')
        popUp.classList.toggle("noDisplay"); // This will make pop-up appear
        // Basically in HTML we have given a number to the product in his class list so that we can use that number here in JS. We will change the number in the pop-up with number we will get from the class
        document.getElementById('popUpP-num').innerText = renderElement.classList[0] 
    })

    // For responsiveness of canvas
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    })

}

// Now we are calling the function to render 'this' model inside 'this' element
render3D('assets/model.gltf', document.getElementById('item-1'))
render3D('assets/model.gltf', document.getElementById('item-2'))
render3D('assets/model.gltf', document.getElementById('item-3'))
render3D('assets/model.gltf', document.getElementById('item-4'))
render3D('assets/model.gltf', document.getElementById('item-5'))
render3D('assets/model.gltf', document.getElementById('item-6'))

// Setup to close the pop-up, Whenever you will click on close button, pop-up will disappear
document.getElementById('popUp-close').addEventListener('click', () => {
    document.getElementById('popUp').classList.toggle("noDisplay");
})