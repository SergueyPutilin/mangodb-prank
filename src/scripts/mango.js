import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'


const canvas = document.querySelector('canvas.webgl')

const sizes = { width: 512, height: 512 }
const aspectRatio = sizes.width / sizes.height;

const scene = new THREE.Scene()

let mango;

// instantiate a loader
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();

const setMaterials = (materials) => {
    loader
        .setMaterials(materials)
        .load(
            // resource URL
            './assets/mango/mango.obj',
            // called when resource is loaded
            (object) => loadMango(object),  
        );
}

const loadMango = (object) => {
    mango = object;

    mango.scale.set(0.1,0.1,0.1)

    mango.position.y = -2
    mango.position.z = 2


    camera.lookAt(mango)
    scene.add( mango );

    console.log(mango)
}


mtlLoader.load(
    './assets/mango/mango.mtl',
    (materials) => setMaterials(materials)
)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.y = -0
camera.position.z = -4
scene.add(camera)

const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableRotate = false;

// Renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas
})

const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
scene.add( light );

renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor( 0x000000, 0 ); // the default

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    controls.update()

    if (mango) {
        mango.rotation.y = elapsedTime;
        // camera.lookAt(mango.position);
    }


    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()