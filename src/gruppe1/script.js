import './style.css';

import * as THREE from "three";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import {addCoordSystem} from "../../static/lib/wfa-coord.js";

import GUI from 'lil-gui';
import {createVehicle} from "./vehicleHelper.js"; //Kjør: npm install --save lil-gui. SE https://www.npmjs.com/package/lil-gui OG https://lil-gui.georgealways.com/
import {animateHookAndWire, animateHookAndWires, animateSupportArms, animateSupportCylinder,} from "./animateHelper.js";
import {createPlaneMesh} from "./worldHelper.js";
import {setCastShadowForAllChildren} from "./misc.js";
import {createBoxMesh} from "./meshes.js";

const ri = {
	currentlyPressedKeys: []
};

export function main() {
	const canvas = document.createElement('canvas');
	document.body.appendChild(canvas);

	// Renderer:
	ri.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
	ri.renderer.setSize(window.innerWidth, window.innerHeight);
	ri.renderer.shadowMap.enabled = true;
	ri.renderer.shadowMapSoft = true;
	ri.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional for softer shadows


	// Scene
	ri.scene = new THREE.Scene();
	ri.scene.background = new THREE.Color( 0xdddddd );

	//Ev. lil-gui kontroller
	ri.lilGui = new GUI();

	// Lys
	addLights();

	// Kamera:
	ri.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	ri.camera.position.x = 20;
	ri.camera.position.y = 10;
	ri.camera.position.z = -6;

	// TrackballControls:
	ri.controls = new TrackballControls(ri.camera, ri.renderer.domElement);
	ri.controls.addEventListener( 'change', renderScene);

	// Klokke for animasjon
	ri.clock = new THREE.Clock();

	//Håndterer endring av vindusstørrelse:
	window.addEventListener('resize', onWindowResize, false);
	//Input - standard Javascript / WebGL:
	document.addEventListener('keyup', handleKeyUp, false);
	document.addEventListener('keydown', handleKeyDown, false);

	// Sceneobjekter
	addSceneObjects();
}



function addSceneObjects() {
	// Dersom aktuelt å laste teksturer, gjøres dette først, slik:
	const loadingManager = new THREE.LoadingManager();
	const textureLoader = new THREE.TextureLoader(loadingManager);
	const textureObjects = [];
	textureObjects[0] = textureLoader.load('../../assets/textures/chocchip.png');
	// Load a cube map
	const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager).setPath('../../assets/cubemaps/GardenNook/');
	textureObjects[1] = cubeTextureLoader.load([
		'px.png', // Positive x (right)
		'nx.png', // Negative x (left)
		'py.png', // Positive y (up)
		'ny.png', // Negative y (down)
		'pz.png', // Positive z (front)
		'nz.png'  // Negative z (back)
	]);
	loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
		console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
	};

	loadingManager.onLoad = () => {
		console.log("Textures loaded:", textureObjects);
		// Fortsetter...
		addSceneObjectsContinued(textureObjects);
	}

	loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
		console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
	};
	loadingManager.onError = (url) => {
		console.log( 'There was an error loading ' + url );
	};

}

function addSceneObjectsContinued(textureObjects) {
	//Her opprettes scene-objekter som legges til ri.scene
	addCoordSystem(ri.scene);


	let vehicle = createVehicle(textureObjects);
	vehicle.position.set(0,0,0);
	vehicle.name = "myVehicle";
	vehicle.castShadow = true;
	vehicle.receiveShadow = true;
	ri.scene.add(vehicle);


	let plane = createPlaneMesh();
	plane.rotateX(Math.PI / 2);
	plane.position.y = -4.2;
	plane.receiveShadow = true; // Enable shadow reception
	ri.scene.add(plane);

	setCastShadowForAllChildren(vehicle, true);

	animate(0);
}

function animate(currentTime) {
	window.requestAnimationFrame((currentTime) => {
		animate(currentTime);
	});

	let delta = ri.clock.getDelta();
	let elapsedTime = ri.clock.getElapsedTime();

	//Oppdater trackball-kontrollen:
	ri.controls.update();

	let vehicle = ri.scene.getObjectByName("myVehicle");
	let operatorCab = vehicle.getObjectByName("myOperatorCab");
	operatorCab.rotation.y = operatorCab.animation.angle;

	let crane = operatorCab.getObjectByName("myCrane");
	crane.rotation.z = crane.animation.angle;

	let craneLever = crane.getObjectByName("myCraneLever");

	let craneLeverArm = operatorCab.getObjectByName("myCraneLeverArm");

	let supportArms = vehicle.getObjectByName("mySupportArms");

	let hook = crane.getObjectByName("myHook");

	let hookWires = crane.getObjectByName("myHookLines");
	animateHookAndWires(ri, hookWires);

	//Sjekker input:
	handleKeys(delta, vehicle, operatorCab, crane, craneLever, craneLeverArm, supportArms, hook, hookWires);

	//Tegner scenen med gitt kamera:
	renderScene();
}

function renderScene()
{
	ri.renderer.render(ri.scene, ri.camera);
}


function onWindowResize() {

	ri.camera.aspect = window.innerWidth / window.innerHeight;
	ri.camera.updateProjectionMatrix();

	ri.renderer.setSize(window.innerWidth, window.innerHeight);

	ri.controls.handleResize();
	renderScene();
}

function handleKeyUp(event) {
	ri.currentlyPressedKeys[event.code] = false;
	console.log(event.code)
}

function handleKeyDown(event) {
	ri.currentlyPressedKeys[event.code] = true;
	console.log(event.code)
}

//Sjekker tastaturet:
function handleKeys(delta, vehicle, operatorCab, crane, craneLever, craneLeverArm, supportArms, hook, hookWires) {
	let rotationSpeed = (Math.PI/2); // Bestemmer rotasjonshastighet.
	let positionSpeed = Math.PI/2;
	let craneSpeed = 0.3;
	let hookSpeed = positionSpeed * delta;
	let supportArmsSpeed = 0.01;
	let frontFrontWheelRotationSpeed = 0.5 * delta;
	const k = 1
	let frontBackWheelRotationSpeed = frontFrontWheelRotationSpeed * k;


	//OPERATOR CAB
	if (ri.currentlyPressedKeys['KeyA']) { //A
		operatorCab.animation.angle = operatorCab.animation.angle + (rotationSpeed * delta);
		operatorCab.animation.angle %= (Math.PI * 2);
	}
	if (ri.currentlyPressedKeys['KeyD']) {	//D
		operatorCab.animation.angle = operatorCab.animation.angle - (rotationSpeed * delta);
		operatorCab.animation.angle %= (Math.PI * 2);
	}

	// CRANE LEVER
	if (ri.currentlyPressedKeys['KeyW']) {	//W

		// crane
		crane.animation.angle = crane.animation.angle + (craneSpeed * delta);
		crane.animation.angle %= (Math.PI * 2);

		//hook
		hook.animation.angle = hook.animation.angle - (craneSpeed * delta);
		hook.animation.angle %= Math.PI * 2;

		// const craneLeverHand = craneLever.getObjectByName("myLeverHand");
		// const leverHandWorldPosition = craneLeverHand.getWorldPosition(new THREE.Vector3());
		// console.log(leverHandWorldPosition);
		// const hookWorldPosition = hook.getWorldPosition(new THREE.Vector3());
		// console.log(hookWorldPosition);
		// // const offsetX = leverHandWorldPosition.x - hookWorldPosition.x;
		// // console.log(offsetX);
		// // hookWorldPosition.x += offsetX;
		// console.log(hook.worldToLocal(hookWorldPosition));
		hook.animation.position.copy(hook.leverHandWorldPosition);
		hook.animation.position.setX(hook.leverHandWorldPosition.x - 0.01);


		hook.rotation.z = hook.animation.angle;
		hook.position.copy(hook.animation.position);

	}
	if (ri.currentlyPressedKeys['KeyS']) {	//S

		crane.animation.angle = crane.animation.angle - (craneSpeed * delta);
		crane.animation.angle %= (Math.PI * 2);
		
		//hook
		hook.animation.angle = hook.animation.angle + (craneSpeed * delta);
		hook.animation.angle %= Math.PI * 2;

		hook.animation.position.copy(hook.leverHandWorldPosition);
		hook.animation.position.setX(hook.leverHandWorldPosition.x + 0.01);

		hook.rotation.z = hook.animation.angle;
		hook.position.copy(hook.animation.position);
	}


	// CRANE LEVER ARM
	if (ri.currentlyPressedKeys['KeyH']) {
		console.log(craneLeverArm.position.x)
		console.log(craneLeverArm.width)
		console.log(craneLever.width)
		let craneLeverArmWorldPos = craneLeverArm.getWorldPosition(new THREE.Vector3());
		let craneLeverWorldPos = craneLever.getWorldPosition(new THREE.Vector3());

		if (craneLeverArm.position.x >= -8.6) {
			craneLeverArm.translateOnAxis(
				new THREE.Vector3(-0.80901699437494742410229341718282, 0.58778525229247312916870595463907, 0),
				positionSpeed * delta);
			console.log(craneLeverArm.matrix);
		}
	}
	if (ri.currentlyPressedKeys['KeyK']) {
		console.log(craneLeverArm.position.x)
		console.log(craneLeverArm.width)
		console.log(craneLever.width)
		if (craneLeverArm.position.x <= -4.8) {
			craneLeverArm.translateOnAxis(
				new THREE.Vector3(-0.80901699437494742410229341718282, 0.58778525229247312916870595463907, 0),
				-positionSpeed * delta);
			console.log(craneLeverArm.matrix);
		}
	}

	// HOOK
	if (ri.currentlyPressedKeys['KeyU']) {
		console.log(hook.position.y)
		if (hook.position.y < -1.1) {
			hook.translateY(hookSpeed);
			console.log(hook.position);
			hook.animation.position.setY(hook.leverHandWorldPosition.y + hookSpeed);
			console.log(hook.position);

			// Henter start- og endepunkt-mesh for å endre Line-geometrien:
			let lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint1');
			let lineMeshEndPosition = ri.scene.getObjectByName('hookJoint1');
			// Henter Line-meshet:
			let wireLineMesh = ri.scene.getObjectByName('wireMesh1', true);
			animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

			lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint2');
			lineMeshEndPosition = ri.scene.getObjectByName('hookJoint2');
			wireLineMesh = ri.scene.getObjectByName('wireMesh2', true);
			animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

			lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint3');
			lineMeshEndPosition = ri.scene.getObjectByName('hookJoint3');
			wireLineMesh = ri.scene.getObjectByName('wireMesh3', true);
			animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

			lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint4');
			lineMeshEndPosition = ri.scene.getObjectByName('hookJoint4');
			wireLineMesh = ri.scene.getObjectByName('wireMesh4', true);
			animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);
		}
	}
	if (ri.currentlyPressedKeys['KeyJ']) {
		console.log(hook.position.y)
		hook.translateY(-hookSpeed);
		hook.animation.position.setY(hook.leverHandWorldPosition.y - hookSpeed);

		// Henter start- og endepunkt-mesh for å endre Line-geometrien:
		let lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint1');
		let lineMeshEndPosition = ri.scene.getObjectByName('hookJoint1');
		// Henter Line-meshet:
		let wireLineMesh = ri.scene.getObjectByName('wireMesh1', true);
		animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

		lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint2');
		lineMeshEndPosition = ri.scene.getObjectByName('hookJoint2');
		wireLineMesh = ri.scene.getObjectByName('wireMesh2', true);
		animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

		lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint3');
		lineMeshEndPosition = ri.scene.getObjectByName('hookJoint3');
		wireLineMesh = ri.scene.getObjectByName('wireMesh3', true);
		animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);

		lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint4');
		lineMeshEndPosition = ri.scene.getObjectByName('hookJoint4');
		wireLineMesh = ri.scene.getObjectByName('wireMesh4', true);
		animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition);
	}

	// SUPPORT ARMS
	if (ri.currentlyPressedKeys['KeyG']) {
		animateSupportArms(supportArms, supportArmsSpeed);
	}
	if (ri.currentlyPressedKeys['KeyB']) {
		animateSupportArms(supportArms, -supportArmsSpeed);
	}

	// SUPPORT ARMS CYLINDER
	if (ri.currentlyPressedKeys['KeyV']) {
		let cylinder = supportArms.getObjectByName("mySupportCylinderAndCone1");
		animateSupportCylinder(cylinder, supportArmsSpeed, false);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone2");
		animateSupportCylinder(cylinder, supportArmsSpeed, false);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone3");
		animateSupportCylinder(cylinder, supportArmsSpeed, false);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone4");
		animateSupportCylinder(cylinder, supportArmsSpeed, false);
	}
	if (ri.currentlyPressedKeys['KeyN']) {
		let cylinder = supportArms.getObjectByName("mySupportCylinderAndCone1");
		animateSupportCylinder(cylinder, -supportArmsSpeed, true);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone2");
		animateSupportCylinder(cylinder, -supportArmsSpeed, true);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone3");
		animateSupportCylinder(cylinder, -supportArmsSpeed, true);

		cylinder = supportArms.getObjectByName("mySupportCylinderAndCone4");
		animateSupportCylinder(cylinder, -supportArmsSpeed, true);
	}

	// WHEELS

	if (ri.currentlyPressedKeys['KeyZ']) {
		const frontWheels = vehicle.getObjectByName("myFrontWheels");
		const frontFrontWheels = frontWheels.getObjectByName("myFrontFrontWheels");
		const frontBackWheels = frontWheels.getObjectByName("myFrontBackWheels");

		frontFrontWheels.children.forEach((frontFrontWheel) => {
			// frontWheel.animation.angle -= frontWheelRotationSpeed;
			// frontWheel.animation.angle %= Math.PI*2;
			//
			// frontWheel.rotation.y = frontWheel.animation.angle;
			console.log("frontFrontWheels rotY: " + frontFrontWheel.rotation.y);
			if (frontFrontWheel.rotation.y >= Math.PI / 3) {
				frontFrontWheel.rotation.y -= frontFrontWheelRotationSpeed;
			}
		})

		frontBackWheels.children.forEach((frontBackWheel) => {
			// frontWheel.animation.angle -= frontWheelRotationSpeed;
			// frontWheel.animation.angle %= Math.PI*2;
			//
			// frontWheel.rotation.y = frontWheel.animation.angle;
			console.log("frontBackWheels rotY: " + frontBackWheel.rotation.y);
			if (frontBackWheel.rotation.y >= (Math.PI / 3)) {
				frontBackWheel.rotation.y -= frontBackWheelRotationSpeed;

			}
		})
	}
	if (ri.currentlyPressedKeys['KeyX']) {
		const frontWheels = vehicle.getObjectByName("myFrontWheels");
		const frontFrontWheels = frontWheels.getObjectByName("myFrontFrontWheels");
		const frontBackWheels = frontWheels.getObjectByName("myFrontBackWheels");

		frontFrontWheels.children.forEach((frontFrontWheel) => {
			// frontWheel.animation.angle -= frontWheelRotationSpeed;
			// frontWheel.animation.angle %= Math.PI*2;
			//
			// frontWheel.rotation.y = frontWheel.animation.angle;
			console.log("frontFrontWheels rotY: " + frontFrontWheel.rotation.y);
			if (frontFrontWheel.rotation.y <= (2*Math.PI / 3)) {
				frontFrontWheel.rotation.y += frontFrontWheelRotationSpeed;
			}
		})

		frontBackWheels.children.forEach((frontBackWheel) => {
			// frontWheel.animation.angle -= frontWheelRotationSpeed;
			// frontWheel.animation.angle %= Math.PI*2;
			//
			// frontWheel.rotation.y = frontWheel.animation.angle;
			console.log("frontBackWheels rotY: " + frontBackWheel.rotation.y);
			if (frontBackWheel.rotation.y <= (2*Math.PI / 3)) {
				frontBackWheel.rotation.y += frontBackWheelRotationSpeed;

			}
		})
	}

}


function addLights() {

	// Ambient:
	let ambientLight1 = new THREE.AmbientLight(0xffffff, 0.3);
	ambientLight1.visible = true;
	ri.scene.add(ambientLight1);
	const ambientFolder = ri.lilGui.addFolder( 'Ambient Light' );
	ambientFolder.add(ambientLight1, 'visible').name("On/Off");
	ambientFolder.add(ambientLight1, 'intensity').min(0).max(1).step(0.01).name("Intensity");
	ambientFolder.addColor(ambientLight1, 'color').name("Color");

	//** RETNINGSORIENTERT LYS (som gir skygge):
	let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.visible = true;
	directionalLight.position.set(40, 20, 0);
	directionalLight.castShadow = true;     //Merk!

	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;
	directionalLight.shadow.camera.near = 0;
	directionalLight.shadow.camera.far = 100;
	directionalLight.shadow.camera.left = -100;
	directionalLight.shadow.camera.right = 100;
	directionalLight.shadow.camera.top = 100;
	directionalLight.shadow.camera.bottom = -100;

	ri.scene.add(directionalLight);
	// Viser lyskilden:
	const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 10, 0xff0000);
	directionalLightHelper.visible = true;
	ri.scene.add(directionalLightHelper);
	// Viser lyskildekamera (hva lyskilden "ser")
	const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
	directionalLightCameraHelper.visible = true;
	ri.scene.add(directionalLightCameraHelper);
	//lil-gui:
	const directionalFolder = ri.lilGui.addFolder( 'Directional Light' );
	directionalFolder.add(directionalLight, 'visible').name("On/Off").onChange(value => {
		directionalLightHelper.visible = value;
		directionalLightCameraHelper.visible = value;
	});
	directionalFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name("Intensity");
	directionalFolder.addColor(directionalLight, 'color').name("Color");

	//** SPOTLIGHT (penumbra = skarpe kanter dersom 0, mer diffus ved økende verdi):
	const spotLight = new THREE.SpotLight(0xffffff, 1, 500, Math.PI*0.3, 0, 0);
	spotLight.visible = false;
	spotLight.castShadow = true;
	spotLight.shadow.camera.near = 10;
	spotLight.shadow.camera.far = 30;
	spotLight.position.set(20, 1, 0);
	ri.scene.add(spotLight.target);
	ri.scene.add(spotLight);
	// Viser lyskilden:
	const spotLightHelper = new THREE.SpotLightHelper( spotLight );
	spotLightHelper.visible = false;
	ri.scene.add( spotLightHelper );
	// Viser lyskildekamera (hva lyskilden "ser")
	const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
	spotLightCameraHelper.visible = false;
	ri.scene.add(spotLightCameraHelper);
	//lil-gui:
	const spotFolder = ri.lilGui.addFolder( 'Spotlight' );
	spotFolder.add(spotLight, 'visible').name("On/Off").onChange(value => {
		spotLightHelper.visible = value;
		spotLightCameraHelper.visible = value;
	});
	spotFolder.add(spotLight, 'intensity').min(0).max(1).step(0.01).name("Intensity");
	spotFolder.addColor(spotLight, 'color').name("Color");

	//** POINTLIGHT:
	let pointLight = new THREE.PointLight(0xff9000, 100);
	pointLight.visible = false;
	pointLight.position.set(7, 3, 10);
	pointLight.shadow.camera.near = 10;
	pointLight.shadow.camera.far = 31;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.shadow.mapSize.width = 1024;
	pointLight.castShadow = true;
	ri.scene.add(pointLight);
	// Viser lyskilden:
	const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 );
	pointLightHelper.visible = false;
	ri.scene.add( pointLightHelper );
	// Viser lyskildekamera (hva lyskilden "ser"):
	const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
	pointLightCameraHelper.visible = false;
	ri.scene.add(pointLightCameraHelper);
	//lil-gui:
	const pointLigthFolder = ri.lilGui.addFolder( 'Pointlight' );
	pointLigthFolder.add(pointLight, 'visible').name("On/Off").onChange(value => {
		pointLightHelper.visible = value;
		pointLightCameraHelper.visible = value;
	});
	pointLigthFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01).name("Intensity");
	pointLigthFolder.addColor(pointLight, 'color').name("Color");
	pointLigthFolder.add(pointLight.position, 'y').min(0).max(100).step(1).name("Height");

}
