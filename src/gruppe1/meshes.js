/**
 * Funksjoner som lager meshobjekter til dronen.
 */
import * as THREE from "three";


export function createCylinderMesh(radiusTop = 0.8, radiusBottom = 0.8, height = 0.1, segments = 50, color = 0xaaaaaa, metalness = 0.5, roughness = 0.6) {
	const cylinderGeometry = new THREE.CylinderGeometry(radiusTop,radiusBottom, height, segments);
	const cylinderMaterial = new THREE.MeshStandardMaterial({color: color});
	return new THREE.Mesh(cylinderGeometry, cylinderMaterial);
}

export function createBoxMesh(width = 1, height = 1, depth = 1, color = 0xaaaaaa, metalness = 0.5, roughness = 0.6) {
	const geometry = new THREE.BoxGeometry(width, height, depth);
	const material = new THREE.MeshStandardMaterial({color: color, metalness: metalness, roughness: roughness});
	const mesh = new THREE.Mesh(geometry, material);
	return mesh;
}


export function createVehicleBaseMesh(width=6, height=1, depth = 20) {
	let geometry = new THREE.BoxGeometry(width,height, depth);
	let material = new THREE.MeshPhysicalMaterial({color:0xcccccc, metalness : 0.7, roughness : 0.3});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createVehicleBaseMesh1(textureObjects) {
	const shape = new THREE.Shape();

	shape.moveTo(0,0);
	shape.lineTo(0,1);
	shape.lineTo(11.3,1);
	shape.lineTo(11.3,0);
	shape.lineTo(10.7,0);
	shape.lineTo(10.7,0.6);
	shape.lineTo(7.7,0.6);
	shape.lineTo(7.5,0);
	shape.lineTo(7.3,0);
	shape.lineTo(7.1,0.6);
	shape.lineTo(4.1,0.6);
	shape.lineTo(3.9,0);
	shape.lineTo(3.7,0);
	shape.lineTo(3.5,0.6);
	shape.lineTo(0.5,0.6);
	shape.lineTo(0.5,0);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0xcccccc, metalness : 0.7, roughness : 0.3});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}


export function createVehicleBaseMesh2() {
	const shape = new THREE.Shape();

	shape.moveTo(0.5,0);
	shape.lineTo(0.5,0.6);
	shape.lineTo(3.5,0.6);
	shape.lineTo(3.7,0);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0x444444, metalness : 0.3, roughness : 0.8});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}


export function createVehicleBaseMesh3() {
	const shape = new THREE.Shape();

	shape.moveTo(3.9,0);
	shape.lineTo(4.1,0.6);
	shape.lineTo(7.1,0.6);
	shape.lineTo(7.3,0);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0x444444, metalness : 0.3, roughness : 0.8});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createVehicleBaseMesh4() {
	const shape = new THREE.Shape();

	shape.moveTo(7.5,0);
	shape.lineTo(7.7,0.6);
	shape.lineTo(10.7,0.6);
	shape.lineTo(10.7,0);
	shape.lineTo(11.3,0);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0x444444, metalness : 0.3, roughness : 0.8});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createVehicleBaseMesh5() {
	const shape = new THREE.Shape();

	shape.moveTo(0,0);
	shape.lineTo(-2.6,0);
	shape.lineTo(-2.8,0.4);
	shape.lineTo(-2.8,0.6);
	shape.lineTo(-5,0.6);
	shape.lineTo(-5,1);
	shape.lineTo(0,1);

	const hole = new THREE.Path();
	hole.moveTo(-2,0);
	hole.lineTo(-2, 0.9);
	hole.lineTo(-2.5, 0.9);
	hole.lineTo(-2.5, 0);
	shape.holes.push(hole);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0xcccccc, metalness : 0.7, roughness : 0.3});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createVehicleBaseMesh6() {
	const shape = new THREE.Shape();

	shape.moveTo(-2.6,0);
	shape.lineTo(-2.8,0.4);
	shape.lineTo(-2.8,0.6);
	shape.lineTo(-9,0.6);
	shape.lineTo(-9,0);

	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: 6,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});
	let material = new THREE.MeshPhysicalMaterial({color:0x444444, metalness : 0.3, roughness : 0.8});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createExhaustMiddleMesh(width = 2, height = 2, depth=4) {
	const shape = new THREE.Shape();

	shape.moveTo(0,0);
	shape.lineTo(width, 0);
	shape.lineTo(width, height);
	shape.lineTo(0, height*1.25);



	let geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 12,
		steps: 10,
		depth: depth,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});

	let material = new THREE.MeshPhysicalMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createExhaustTriangularMesh(width = 2, height = 2, depth=4, color=0xffffff) {
	let triangularShape = new THREE.Shape();
	triangularShape.moveTo(0,0);
	triangularShape.lineTo(1,0);
	triangularShape.lineTo(1,1);

	const extrudeSettings = {
		steps: 5,
		depth: 4,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let triangularGeometry = new THREE.ExtrudeGeometry(triangularShape, extrudeSettings);
	let material = new THREE.MeshStandardMaterial({color:color, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh(triangularGeometry, material);

	return mesh;
}

export function createExhaustPipeMesh(radiusTop=0.1, radiusBottom=0.1, height = 2) {
	let geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
	let material = new THREE.MeshPhysicalMaterial({color:0x888888, metalness : 0.8, roughness : 0.1, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createExhaustPipeTopMesh(radius = 0.3, tube = 0.1, radialSegments = 32, tubularSegments = 32, arc = 2) {
	const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc);
	let material = new THREE.MeshPhysicalMaterial({color:0x888888, metalness : 0.8, roughness : 0.1, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

export function createFrontBaseMesh(width = 6, height = 2, depth=4) {
	let shape = new THREE.Shape();

	shape.moveTo(-0.5,0.5);
	shape.lineTo(-0.5, -0.8);
	shape.lineTo(1, -1);
	shape.lineTo(2.2, -1);
	shape.lineTo(4, 0.4);
	shape.lineTo(4, 1);
	shape.lineTo(3, 1);




	const extrudeSettings = {
		steps: 5,
		depth: 4,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xff0000, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontSeatMesh1() {
	let shape = new THREE.Shape();

	shape.moveTo(-0.5,0.5);
	shape.lineTo(-0.5, -0.8);
	shape.lineTo(1, -1);
	shape.lineTo(2.2, -1);
	shape.lineTo(4, 0.4);
	shape.lineTo(4, 3);
	shape.lineTo(1, 3);

	let hole1 = new THREE.Path();
	hole1.moveTo(3,1.2);
	hole1.lineTo(3,2.8);
	hole1.lineTo(1.2,2.8);
	hole1.lineTo(1.2,1.2);

	let hole2 = new THREE.Path();
	hole2.moveTo(3.9,1.2);
	hole2.lineTo(3.9,2.8);
	hole2.lineTo(3.2,2.8);
	hole2.lineTo(3.2,1.2);

	let hole3 = new THREE.Path();
	hole3.moveTo(0,1);
	hole3.lineTo(1,1);
	hole3.lineTo(1,2.7);

	shape.holes.push(hole1);
	shape.holes.push(hole2);
	shape.holes.push(hole3);


	const extrudeSettings = {
		steps: 5,
		depth: 0.1,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontSeatMesh2() {
	let shape = new THREE.Shape();

	shape.moveTo(0, 1.12);
	shape.lineTo(2, 1.12);
	shape.lineTo(2, 3.95);
	shape.lineTo(0, 3.95);


	let hole1 = new THREE.Path();
	hole1.moveTo(0.2, 1.2);
	hole1.lineTo(1.9, 1.2);
	hole1.lineTo(1.9, 3.8);
	hole1.lineTo(0.1,3.8);
	shape.holes.push(hole1);


	const extrudeSettings = {
		steps: 5,
		depth: 0.1,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontSeatMesh3() {

	let path = new THREE.Path();
	path.moveTo(-0.5, -0.8);
	path.lineTo(1, -1);


	const extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(new THREE.Shape(path.getPoints()), extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontSeatMesh4() {

	let shape = new THREE.Shape();
	shape.moveTo(1, -1);
	shape.lineTo(2.2, -1);


	const extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontSeatMesh5() {

	let shape = new THREE.Shape();
	shape.moveTo(2.2, -1);
	shape.lineTo(4, 0.4);


	const extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xffffff, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createFrontBumperMesh(width = 6, height = 1.3, depth=0.3) {
	let geometry = new THREE.BoxGeometry(width, height, depth);
	let material = new THREE.MeshStandardMaterial({color:0xff0000, metalness : 0.5, roughness : 0.6, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createWindowMesh(width = 1.79, height = 1.59, depth=0.1, textureObjects) {
	const geometry = new THREE.BoxGeometry(width, height, depth);
	const glassMaterial = new THREE.MeshStandardMaterial({
		color: 0x444444,
		transparent: true,
		opacity: 0.5,
		side: THREE.DoubleSide,
		envMap: textureObjects[1],
		roughness : 0,

	});
	const windowBox = new THREE.Mesh(geometry, glassMaterial);

	return windowBox;
}

export function createTriangularWindowMesh(width = 1.79, height = 1.59, depth=0.1, textureObjects) {
	const shape = new THREE.Shape();
	shape.moveTo(0,1);
	shape.lineTo(1,1);
	shape.lineTo(1,2.7);

	const extrudeSettings = {
		steps: 5,
		depth: depth,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	const glassMaterial = new THREE.MeshStandardMaterial({
		color: 0x444444,
		transparent: true,
		opacity: 0.5,
		side: THREE.DoubleSide,
		envMap: textureObjects[1],
		roughness : 0,
	});
	const windowBox = new THREE.Mesh(geometry, glassMaterial);

	return windowBox;
}

export function createOperatorBackMesh() {
	let shape = new THREE.Shape();

	shape.moveTo(0,0);
	shape.lineTo(1, 0);
	shape.lineTo(2, 1);
	shape.lineTo(2, 2);
	shape.lineTo(1, 3);
	shape.lineTo(0, 3);
	shape.lineTo(-1, 3);
	shape.lineTo(-2, 2);
	shape.lineTo(-2, 1);
	shape.lineTo(-1, 0);

	const extrudeSettings = {
		steps: 5,
		depth: 1.75,
		bevelEnabled: false,
		bevelThickness: 0.1,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 5
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0x444444});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createWheelMesh(radiusTop = 1.5, radiusBottom = 0.9, height = 1) {
	// Create the outer circle for the wheel
	const outerShape = new THREE.Shape();
	outerShape.absarc(0, 0, radiusTop, 0, Math.PI * 2, false); // Outer circle

	// Create a hole in the middle (for example, a hub)
	const hole = new THREE.Path();
	hole.absarc(0, 0, radiusBottom, 0, Math.PI * 2, true); // Inner hole (hub)
	outerShape.holes.push(hole);

	// Create the extruded geometry
	const geometry = new THREE.ExtrudeGeometry(outerShape, {
		curveSegments: 50,
		steps: 10,
		depth: height,         // Height of the extrusion
		bevelEnabled: true,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});

	// Create material and mesh
	const material = new THREE.MeshPhongMaterial({ color: 0x333333, side: THREE.DoubleSide });
	const mesh = new THREE.Mesh(geometry, material);

	return mesh;
}

export function createWheelRimMesh(outerRadius = 0.8, innerRadius = 0.7, height = 1) {
	const shape = new THREE.Shape();
	shape.arc(0, 0, outerRadius, Math.PI * 2, false);

	// Create a hole in the middle (for example, a hub)
	const hole = new THREE.Path();
	hole.arc(0, 0, innerRadius, 0, Math.PI * 2, true); // Inner hole (hub)
	shape.holes.push(hole);

	// Create the extruded geometry
	const geometry = new THREE.ExtrudeGeometry(shape, {
		curveSegments: 50,
		steps: 10,
		depth: height,         // Height of the extrusion
		bevelEnabled: false,    // enable for round wheel
		bevelThickness: 0.2,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 100
	});

	// Create material and mesh
	const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
	const mesh = new THREE.Mesh(geometry, material);

	return mesh;
}

export function createWheelRimSurfaceMesh(radiusTop = 0.8, radiusBottom = 0.8, height = 0.1, segments = 50, color = 0xaaaaaa) {
	const cylinderGeometry = new THREE.CylinderGeometry(radiusTop,radiusBottom, height, segments);
	const cylinderMaterial = new THREE.MeshStandardMaterial({color: color});
	const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);


	return cylinderMesh;
}


export function createOperatorSeatMesh() {
	let operatorCabShape = new THREE.Shape();

	operatorCabShape.moveTo(0,0);
	operatorCabShape.lineTo(2, 0);
	operatorCabShape.lineTo(2.1, 1);
	operatorCabShape.lineTo(2, 1.8);
	operatorCabShape.bezierCurveTo(2, 1.8, 2, 2, 1.8, 2);

	operatorCabShape.lineTo(0.5, 2);
	operatorCabShape.lineTo(-0.3, 0.8);
	// operatorCabShape.lineTo(1, 0);

	const extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	let geometry = new THREE.ExtrudeGeometry(operatorCabShape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xFFFFFF, metalness : 0.5, roughness : 0.6});
	// let material = new THREE.MeshStandardMaterial({color:0xDDDDDD, side: THREE.DoubleSide, });
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createOperatorMiddleWallMesh() {
	let shape = new THREE.Shape();

	shape.moveTo(0,0);
	shape.lineTo(0, 1);
	shape.lineTo(1, 2);
	shape.lineTo(2, 2.5);
	shape.lineTo(5.9, 2.5);
	shape.lineTo(5.9, 0);

	const extrudeSettings = {
		steps: 5,
		depth: 0.1,
		bevelEnabled: false,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xFFFFFF, side: THREE.DoubleSide, metalness : 0.5, roughness : 0.6});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createOperatorLeftPartMesh() {
	let shape = new THREE.Shape();


	shape.moveTo(0,0);
	shape.lineTo(0, 0.5);
	shape.lineTo(0.5, 1);
	shape.lineTo(3, 1);
	shape.lineTo(3, 1.6);
	shape.lineTo(5.4, 1.6);
	shape.lineTo(5.4, 0);


	const extrudeSettings = {
		steps: 5,
		depth: 2,
		bevelEnabled: false,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({color:0xFFFFFF, side: THREE.DoubleSide, metalness : 0.5, roughness : 0.6});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createLadderPart(width=0.1, height=0.1, depth = 1.2) {
	let geometry = new THREE.BoxGeometry(width,height, depth);
	let material = new THREE.MeshStandardMaterial({/*wireframe: true,*/ color:0xFF0000, side: THREE.DoubleSide});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createHookBasePart1Mesh(textureObjects) {
	let shape = new THREE.Shape();

	shape.moveTo(-0.25,0);
	shape.lineTo(-0.5, -0.5);
	shape.lineTo(-0.5, -1);
	shape.lineTo(0.5, -1);
	shape.lineTo(0.5, -0.5);
	shape.lineTo(0.25, 0);

	const extrudeSettings = {
		steps: 5,
		depth: 0.5,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({
		color:0x444444, metalness: 0.8, roughness: 0.2, envMap: textureObjects[1]});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}

export function createHookBasePart2Mesh(textureObjects) {
	let shape = new THREE.Shape();

	shape.moveTo(-0.2,0);
	shape.lineTo(-0.2, -0.3);
	shape.lineTo(0, -0.5);
	shape.lineTo(0.2, -0.3);
	shape.lineTo(0.2, 0);

	const extrudeSettings = {
		steps: 5,
		depth: 0.25,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
	let material = new THREE.MeshStandardMaterial({
		color:0x444444, metalness: 0.8, roughness: 0.2, envMap: textureObjects[1]});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}


export function createHookMesh(textureObjects) {

	// Curved hook part
	const shape = new THREE.Shape();
	shape.moveTo(0.1, 0);

	// Define an array of points
	const points = [
		new THREE.Vector2(0.1, -0.1),
		new THREE.Vector2(0.4, -0.4),
		new THREE.Vector2(0.5, -0.6),
		new THREE.Vector2(0.3, -0.8),
		new THREE.Vector2(-0.1, -1),
		new THREE.Vector2(-0.3, -0.8),
		new THREE.Vector2(-0.4, -0.5),
		new THREE.Vector2(-0.2, -0.8),
		new THREE.Vector2(0.2, -0.8),
		new THREE.Vector2(0.3, -0.5),
		new THREE.Vector2(0, -0.2),
		new THREE.Vector2(-0.1, -0.1),
	];


	// Use splineThru with the array of points
	shape.splineThru(points);
	shape.moveTo(-0.1,0);


	const extrudeSettings = {
		steps: 5,
		depth: 0.25,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.1,
		bevelOffset: 0,
		bevelSegments: 10
	};

	const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	let material = new THREE.MeshStandardMaterial({
		color:0x444444, metalness: 0.8, roughness: 0.2, envMap: textureObjects[1]});
	let mesh = new THREE.Mesh( geometry, material);
	return mesh;
}


export function createHookLinesMesh(points) {
	const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
	const lineMaterial = new THREE.LineBasicMaterial({color:0x000000, side: THREE.DoubleSide});
	const wireMesh = new THREE.Line( lineGeometry, lineMaterial );

	return wireMesh;
}

export function createPointMesh(coordinates = [0, 0, 0], color = 0x000000, size = 0.01) {
	// Validate the coordinates input
	if (!Array.isArray(coordinates) || coordinates.length !== 3) {
		throw new Error('Coordinates must be an array of three numbers [x, y, z]');
	}

	// Create geometry with a single point position
	const pointGeometry = new THREE.BufferGeometry();
	const position = new Float32Array(coordinates); // Position for the single point
	pointGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

	// Create material for the point
	const pointMaterial = new THREE.PointsMaterial({
		color: color,        // Color passed as a parameter
		size: size,          // Size passed as a parameter
		sizeAttenuation: true // Makes point size perspective-dependent
	});

	// Create the Points object
	const singlePoint = new THREE.Points(pointGeometry, pointMaterial);

	return singlePoint;
}
