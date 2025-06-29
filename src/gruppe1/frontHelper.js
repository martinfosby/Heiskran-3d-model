import * as THREE from "three";
import {
    createBoxMesh,
    createExhaustMiddleMesh,
    createExhaustPipeMesh,
    createExhaustPipeTopMesh,
    createExhaustTriangularMesh,
    createFrontBaseMesh, createFrontBumperMesh, createFrontSeatMesh1, createFrontSeatMesh2, createFrontSeatMesh3, createFrontSeatMesh4, createFrontSeatMesh5,
    createWindowMesh, createTriangularWindowMesh,
} from "./meshes.js";

export function createExhaust() {
    let group = new THREE.Group();

    // right
    let exhaustBaseMesh1 = createBoxMesh(2, 2, 4, 0xffffff);
    exhaustBaseMesh1.position.set(2,0,0);
    group.add(exhaustBaseMesh1);

    // left
    let exhaustBaseMesh2 = createBoxMesh(2, 2, 4, 0xffffff);
    exhaustBaseMesh2.position.set(-2,0,0);
    group.add(exhaustBaseMesh2);

    // middle
    let exhaustBaseMesh3 = createExhaustMiddleMesh(4,1.5,2);
    exhaustBaseMesh3.position.set(-1,-1,2);
    exhaustBaseMesh3.rotateY(Math.PI/2);
    group.add(exhaustBaseMesh3);

    // pipe
    let exhaustPipeMesh = createExhaustPipeMesh();
    exhaustPipeMesh.position.set(2.5,2,1.5);
    group.add(exhaustPipeMesh);

    let exhaustPipeTopMesh = createExhaustPipeTopMesh();
    exhaustPipeTopMesh.position.set(2.5,3,1.2);
    exhaustPipeTopMesh.rotateY(3*Math.PI/2);
    group.add(exhaustPipeTopMesh);

    // triangular left
    let exhaustTriangularLeftMesh = createExhaustTriangularMesh();
    exhaustTriangularLeftMesh.scale.set(1,2,0.5);
    exhaustTriangularLeftMesh.position.set(-3,-1,3);
    exhaustTriangularLeftMesh.rotateY(Math.PI/2);
    group.add(exhaustTriangularLeftMesh);


    // triangular middle
    let exhaustTriangularMiddleMesh = createExhaustTriangularMesh(undefined, undefined, undefined, 0x444444);
    exhaustTriangularMiddleMesh.scale.set(0.95,1.875,0.5);
    exhaustTriangularMiddleMesh.position.set(-1,-1,2.945);
    exhaustTriangularMiddleMesh.rotateY(Math.PI/2);
    group.add(exhaustTriangularMiddleMesh);

    return group;
}


export function createFront(textureObjects) {
    let group = new THREE.Group();
    let frontMesh = createFrontBaseMesh();
    frontMesh.position.set(-3, -0.5, 2);
    frontMesh.rotateY(Math.PI/2);
    group.add(frontMesh);

    let frontSeatMesh1 = createFrontSeatMesh1();
    frontSeatMesh1.position.set(1, -0.5, 2);
    frontSeatMesh1.rotateY(Math.PI/2);
    group.add(frontSeatMesh1);

    frontSeatMesh1 = createFrontSeatMesh1();
    frontSeatMesh1.position.set(2.9, -0.5, 2);
    frontSeatMesh1.rotateY(Math.PI/2);
    group.add(frontSeatMesh1);

    let frontSeatMesh2 = createFrontSeatMesh2();
    frontSeatMesh2.position.set(1, -1, 3);
    frontSeatMesh2.rotateX(-Math.PI/6);
    group.add(frontSeatMesh2);

    let boxMesh = createBoxMesh(1.98, 0.1, 3.12, 0xffffff);
    boxMesh.position.set(2, 2.449, -0.45);
    group.add(boxMesh);

    let frontSeatMesh3 = createFrontSeatMesh3();
    frontSeatMesh3.position.set(0.9, -0.5, 2);
    frontSeatMesh3.rotateY(Math.PI/2);
    group.add(frontSeatMesh3);

    let frontSeatMesh4 = createFrontSeatMesh4();
    frontSeatMesh4.position.set(0.9, -0.5, 2);
    frontSeatMesh4.rotateY(Math.PI/2);
    group.add(frontSeatMesh4);

    let frontSeatMesh5 = createFrontSeatMesh5();
    frontSeatMesh5.position.set(0.9, -0.5, 2);
    frontSeatMesh5.rotateY(Math.PI/2);
    group.add(frontSeatMesh5);

    // Window box
    const windowBox1 = createWindowMesh(undefined, undefined, undefined, textureObjects);
    windowBox1.position.set(2.95, 1.5, -0.1);
    windowBox1.rotateY(Math.PI/2);
    group.add(windowBox1);

    const windowBox2 = createWindowMesh(undefined, undefined, undefined, textureObjects);
    windowBox2.position.set(1.05, 1.5, -0.1);
    windowBox2.rotateY(Math.PI/2);
    group.add(windowBox2);

    const windowBox3 = createWindowMesh(undefined, undefined, undefined, textureObjects);
    windowBox3.position.set(2.95, 1.5, -1.55);
    windowBox3.rotateY(Math.PI/2);
    windowBox3.scale.setX(0.39);
    windowBox3.scale.setY(1.007);
    group.add(windowBox3);

    const windowBox4 = createBoxMesh(1.79, 1.59, 0.1, 0xffffff);
    windowBox4.position.set(1.055, 1.5, -1.55);
    windowBox4.rotateY(Math.PI/2);
    windowBox4.scale.setX(0.39);
    windowBox4.scale.setY(1.007);
    group.add(windowBox4);


    const windowBox5 = createTriangularWindowMesh(undefined, undefined, undefined, textureObjects);
    windowBox5.position.set(2.9, -0.499, 1.999);
    windowBox5.rotateY(Math.PI/2);
    group.add(windowBox5);

    const windowBox6 = createTriangularWindowMesh(undefined, undefined, undefined, textureObjects);
    windowBox6.position.set(1.0, -0.499, 1.999);
    windowBox6.rotateY(Math.PI/2);
    group.add(windowBox6);


    const windowBox7 = createWindowMesh(1.9, 2.8, 0.1, textureObjects);
    windowBox7.rotateX(-Math.PI/6);
    windowBox7.position.set(2, 1.25, 1.75);
    group.add(windowBox7);


    let frontBumper = createFrontBumper()
    frontBumper.position.set(0,-0.65,2.65);
    group.add(frontBumper);

    return group;
}

export function createFrontBumper() {
    const group = new THREE.Group();

    const frontBumperMesh = createFrontBumperMesh();
    group.add(frontBumperMesh);

    const bumperLights = createBumperLights();
    group.add(bumperLights);

    return group;
}


function createBumperLights() {
    const group = new THREE.Group();

    let spotLight1 = new THREE.SpotLight(0xffffff, 1.0, 1000, Math.PI/6,0.5, 0);
    spotLight1.position.set(-2,0, 0.5);
    spotLight1.visible = true;
    spotLight1.castShadow = true;


    let spotLight2 = new THREE.SpotLight(0xffffff, 1.0, 1000, Math.PI/6, 0.5, 0);
    spotLight2.position.set(2,0, 0.5);
    spotLight2.visible = true;
    spotLight2.castShadow = true;

    group.add(spotLight1);
    group.add(spotLight2);

    // Create a target object and add it to the scene
    const targetObject1 = createBoxMesh();
    targetObject1.position.set(-2,0,20);
    group.add(targetObject1);

    // Create a target object and add it to the scene
    const targetObject2 = createBoxMesh();
    targetObject2.position.set(2,0,20);
    group.add(targetObject2);

    // Set the spotlight's target to the target object
    spotLight1.target = targetObject1;
    spotLight2.target = targetObject2;




    const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
    spotLightHelper1.visible = true;
    const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
    spotLightHelper2.visible = true;

    group.add(spotLightHelper1);
    group.add(spotLightHelper2);


    return group;
}