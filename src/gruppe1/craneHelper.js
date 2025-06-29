import * as THREE from "three";
import {createHook, createHookLines} from "./hookHelper.js";
import {createPointMesh} from "./meshes.js";
import {createPointsForHookWire, alignPositionWithYOffset} from "./misc.js";


export function createCrane(textureObjects) {
    let group = new THREE.Group();

    let craneLeverGeometry = new THREE.BoxGeometry(15, 2, 1);
    let material = new THREE.MeshPhongMaterial({color:0xFFFFFF, side: THREE.DoubleSide});
    let craneLeverMesh = new THREE.Mesh(craneLeverGeometry, material);
    craneLeverMesh.position.set(-3,7,-1);
    craneLeverMesh.rotateZ(Math.PI*2.8);
    craneLeverMesh.translateX(-2);
    craneLeverMesh.width = craneLeverGeometry.parameters.width;
    craneLeverMesh.name = "myCraneLever";
    group.add(craneLeverMesh);


    let leverArmAndHookAndWire = createLeverAndHookAndWire(textureObjects);
    const leverArm = leverArmAndHookAndWire.getObjectByName("myLeverArm")
    const leverHand = leverArmAndHookAndWire.getObjectByName("myLeverHand")
    leverArmAndHookAndWire.width = leverArm.geometry.parameters.width + leverHand.geometry.parameters.width;
    leverArmAndHookAndWire.position.set(-12, 15.3, -1);
    leverArmAndHookAndWire.translateOnAxis(new THREE.Vector3(Math.cos(Math.PI*2.8), Math.sin(Math.PI*2.8), 0),
        -4.2);
    leverArmAndHookAndWire.name = "myCraneLeverArm";
    group.add(leverArmAndHookAndWire);

    let craneSupportGeometry = new THREE.CylinderGeometry(0.3,0.3, 11);
    let craneSupportMesh = new THREE.Mesh(craneSupportGeometry, material);
    craneSupportMesh.position.set(-3,4.4,-1);
    craneSupportMesh.rotateZ(Math.PI*2.21);
    group.add(craneSupportMesh);

    return group;
}

export function createCraneLeverArm(textureObjects) {
    let group = new THREE.Group();

    let craneLeverGeometry = new THREE.BoxGeometry(5, 1, 0.5);
    let craneLeverMaterial = new THREE.MeshStandardMaterial(
        {color:0x333333,
            side: THREE.DoubleSide,
            metalness:0.8,
            roughness:0.1,
            envMap: textureObjects[1]
        });
    let craneLeverMesh = new THREE.Mesh(craneLeverGeometry, craneLeverMaterial);
    craneLeverMesh.name = "myLeverArm";
    craneLeverMesh.position.set(0,1.5,0);
    group.add(craneLeverMesh);

    let leverHandGeometry = new THREE.BoxGeometry(0.8, 2, 1.1);
    let leverHand = new THREE.Mesh(leverHandGeometry, craneLeverMaterial);
    leverHand.position.set(2.75,2,0);
    leverHand.name = "myLeverHand";
    group.add(leverHand);


    let point1 = createPointMesh();
    point1.name = "leverArmJoint1";
    // point1.position.set(3,3,0.25);
    // Add to scene
    group.add(point1);

    let point2 = createPointMesh();
    point2.name = "leverArmJoint2";
    // point2.position.set(3,3,-0.25);
    // Add to scene
    group.add(point2);

    let point3 = createPointMesh();
    point3.name = "leverArmJoint3";
    // point3.position.set(2.5,3,-0.25);
    // Add to scene
    group.add(point3);

    let point4 = createPointMesh();
    point4.name = "leverArmJoint4";
    // point4.position.set(2.5,3,0.25);
    // Add to scene
    group.add(point4);

    return group;
}


export function createLeverAndHookAndWire(textureObjects) {
    let group = new THREE.Group();

    let leverArm = createCraneLeverArm(textureObjects);
    leverArm.rotateZ(Math.PI*2.8);
    group.add(leverArm);

    let hook = createHook(textureObjects);
    // hook.position.set(-15.8,12.7,-1.25);
    // hook.position.set(-3.75,-2.8,-0.15);
    const leverHand = leverArm.getObjectByName("myLeverHand");
    let leverHandWorldPosition = new THREE.Vector3();
    leverHand.getWorldPosition(leverHandWorldPosition);
    leverHandWorldPosition.x -= 0.35;
    leverHandWorldPosition.y -= 2;
    leverHandWorldPosition.z -= 0.15;
    console.log(leverHandWorldPosition);
    hook.leverHandWorldPosition = leverHandWorldPosition;
    hook.position.copy(leverHandWorldPosition);
    hook.scale.set(0.6,0.6,0.6);
    hook.name = "myHook";
    hook.animation = {angle: 0, position: leverHandWorldPosition};
    group.add(hook);

    let lineMeshStartPosition = leverArm.getObjectByName('leverArmJoint1');
    let lineMeshEndPosition = hook.getObjectByName('hookJoint1');
    alignPositionWithYOffset(lineMeshStartPosition, lineMeshEndPosition, -0.5);
    const wire1 = createPointsForHookWire(lineMeshStartPosition, lineMeshEndPosition);

    lineMeshStartPosition = leverArm.getObjectByName('leverArmJoint2');
    lineMeshEndPosition = hook.getObjectByName('hookJoint2');
    alignPositionWithYOffset(lineMeshStartPosition, lineMeshEndPosition, -0.5);
    const wire2 = createPointsForHookWire(lineMeshStartPosition, lineMeshEndPosition);

    lineMeshStartPosition = leverArm.getObjectByName('leverArmJoint3');
    lineMeshEndPosition = hook.getObjectByName('hookJoint3');
    alignPositionWithYOffset(lineMeshStartPosition, lineMeshEndPosition, -0.5);
    const wire3 = createPointsForHookWire(lineMeshStartPosition, lineMeshEndPosition);

    lineMeshStartPosition = leverArm.getObjectByName('leverArmJoint4');
    lineMeshEndPosition = hook.getObjectByName('hookJoint4');
    alignPositionWithYOffset(lineMeshStartPosition, lineMeshEndPosition, -0.5);
    const wire4 = createPointsForHookWire(lineMeshStartPosition, lineMeshEndPosition);

    let hookLines = createHookLines(wire1, wire2, wire3, wire4);
    hookLines.name = "myHookLines";
    hookLines.animation = {angle: 0};
    group.add(hookLines);

    return group;
}


