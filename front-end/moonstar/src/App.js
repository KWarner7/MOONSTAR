import React, {useRef, useState} from 'react'
import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage.js';
import Login from './Login.js';
import ActiveProjects from './ActiveProjects.js';
import CompletedProjects from './CompletedProjects.js';
import EditProject from './EditProject';
import Signup from './Signup.js';
import CreateProject from './CreateProject.js';
import StatusUpdate from './StatusUpdate';
import ProjectDetails from './ProjectDetails.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import * as THREE from 'three'

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
camera.lookAt(0.5, 0.5, 0.5)
controls.target.set(.5, .5, .5)
controls.update()

controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener('start', () => console.log("Controls Start Event"))
controls.addEventListener('end', () => console.log("Controls End Event"))
controls.autoRotate = false
controls.autoRotateSpeed = 5
controls.enableDamping = true
controls.dampingFactor = .01
controls.enableKeys = true //older versions
controls.listenToKeyEvents(document.body)
controls.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown" // down arrow
}
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
}
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
}
controls.screenSpacePanning = true
controls.minAzimuthAngle = 0
controls.maxAzimuthAngle = Math.PI / 2
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI
controls.maxDistance = 800
controls.minDistance = .05


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const light = new THREE.AmbientLight( 0x404040, 500 ); // soft white light
scene.add( light );

const loader = new GLTFLoader();

loader.load( './Space_Force_Logo/scene.gltf', function ( gltf ) {
    scene.position.x = (0, -50, 0);
    scene.add( gltf.scene )
}, undefined, function ( error ) {
    console.error( error );
} );

camera.position.z = 300;


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    scene.rotation.y += 0.001;
    renderer.render( scene, camera );
}
animate();



function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
		<Router>
			<div className='App'>
				<header className='App-header'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/active-projects' element={<ActiveProjects />} />
						<Route path='/completed-projects' element={<CompletedProjects />} />
						<Route path='/edit-project/:taskId' element={<EditProject />} />
						<Route path='/create-project' element={<CreateProject />} />
						<Route path='/project-status/:taskId' element={<StatusUpdate />} />
						<Route path='/project-details/:id' element={<ProjectDetails />} />

					</Routes>
				</header>
			</div>
		</Router>
		</LocalizationProvider>
	);
}

export default App;













// const GltfModel = ({ './Space_Force_Logo/scene.gltf': scale = 40, position = [0, 0, 0] }) => {
//   const ref = useRef();
//   const gltf = useLoader(GLTFLoader, './Space_Force_Logo/scene.gltf');
//   const [hovered, hover] = useState(false);

//   useFrame((state, delta) => (ref.current.rotation.y += 0.003));
//   return(
//     <>
//     <primitive
//       ref={ref}
//       object={gltf.scene}
//       position={position}
//       scale={hovered ? scale * 1.2 : scale}
//       onPointerOver={ (event) => hover(true) }
//       onPointerOut={ (event) => hover(false) }
//     />
//     </>
//   )
// }

  // export default GltfModel;