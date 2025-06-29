import * as THREE from "three";
import {
    createOperatorBackMesh,
    createLadderPart,
    createOperatorLeftPartMesh,
    createOperatorMiddleWallMesh,
    createOperatorSeatMesh
} from "./meshes.js";
import {createCrane} from "./craneHelper.js";


export function createOperatorCab(textureObjects) {
    let group = new THREE.Group();

    let operatorSeat = createOperatorSeat();
    operatorSeat.position.set(0,0.2,-0.4);
    operatorSeat.scale.set(1,1,1);
    group.add(operatorSeat);


    let rightPart = createOperatorPartRight();

    rightPart.position.set(2.5, 0.9, 0.6);
    rightPart.scale.set(1,1.1,1);
    group.add(rightPart);

    let middlePart = createOperatorMiddlePart(textureObjects);
    middlePart.position.set(2,0,-0.35);
    group.add(middlePart);

    let leftPart = createOperatorPartLeft();
    leftPart.position.set(2.5,0.2, -3.5);
    group.add(leftPart);

    const backPart = createOperatorBack();
    backPart.rotateY(Math.PI/2);
    backPart.rotateX(Math.PI/2);
    backPart.position.set(6.45,1.65,-1);
    backPart.scale.setX(2.6);
    backPart.scale.setZ(0.9);

    group.add(backPart);


    return group;
}


export function createOperatorMiddlePart(textureObjects) {
    let group = new THREE.Group();

    let cylinderGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1);
    let material = new THREE.MeshPhongMaterial();
    let cylinderFoundationMesh = new THREE.Mesh(cylinderGeometry, material);
    cylinderFoundationMesh.position.set(0.7,0.1,-1);
    group.add(cylinderFoundationMesh);

    let foundationPlatformGeometry = new THREE.BoxGeometry(6,0.1, 2);
    let foundationPlatformMesh = new THREE.Mesh(foundationPlatformGeometry, material);
    foundationPlatformMesh.position.set(3,0.1,-1);
    group.add(foundationPlatformMesh);


    let wall1 = createOperatorMiddleWallMesh();
    wall1.position.set(0,0.15,-0.15);
    group.add(wall1);

    let crane = createCrane(textureObjects);
    crane.position.set(0,0,0.35);
    crane.name = "myCrane";
    crane.animation = {angle: 0};
    group.add(crane);

    let wall2 = createOperatorMiddleWallMesh();
    wall2.position.set(0,0.15,-1.25);
    group.add(wall2);

    let engineGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.09);
    let engineMesh = new THREE.Mesh(engineGeometry, material);
    engineMesh.position.set(5.5,2.4,-0.6);
    engineMesh.rotateX(Math.PI/2);
    group.add(engineMesh);

    return group;
}

export function createOperatorPartRight() {
    let group = new THREE.Group();
    let part1Geometry = new THREE.BoxGeometry(0.5, 1.5, 2);
    let material = new THREE.MeshStandardMaterial({metalness: 0.6, roughness:0.3});
    let part1Mesh = new THREE.Mesh(part1Geometry, material);
    group.add(part1Mesh);

    let part2Geometry = new THREE.BoxGeometry(1.5, 1.5, 1.8);
    let part2Mesh = new THREE.Mesh(part2Geometry, material);
    part2Mesh.position.set(0.5,0,-0.1);
    group.add(part2Mesh);

    let part3Geometry = new THREE.BoxGeometry(2.7, 1.5, 2);
    let part3Mesh = new THREE.Mesh(part3Geometry, material);
    part3Mesh.position.set(2.6,0,0);
    group.add(part3Mesh);

    let part3ExtraGeometry = new THREE.BoxGeometry(1.5, 0.1, 2);
    let part3ExtraMesh = new THREE.Mesh(part3ExtraGeometry, material);
    part3ExtraMesh.position.set(4.7,0.7,0);
    group.add(part3ExtraMesh);

    let ladderPart1 = createLadderPart();
    ladderPart1.position.set(0.75,-0.2,0.9);
    ladderPart1.scale.set(1.22,1,0.83);
    ladderPart1.rotateY(Math.PI/2);
    group.add(ladderPart1);

    let ladderPart2 = createLadderPart();
    ladderPart2.position.set(0.75,0.3,0.9);
    ladderPart2.scale.set(1.22,1,0.83);
    ladderPart2.rotateY(Math.PI/2);
    group.add(ladderPart2);

    let standingPlatformGeometry = new THREE.BoxGeometry(4.2, 0.1, 0.6);
    let standingPlatformMesh = new THREE.Mesh(standingPlatformGeometry, material);
    standingPlatformMesh.position.set(1.85,-0.7,1.1);
    group.add(standingPlatformMesh);

    let fence1Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
    let fence1Mesh = new THREE.Mesh(fence1Geometry, material);
    fence1Mesh.position.set(1.4,1.2,0.9);
    group.add(fence1Mesh);

    let fence2Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
    let fence2Mesh = new THREE.Mesh(fence2Geometry, material);
    fence2Mesh.position.set(2.6,1.2,0.9);
    group.add(fence2Mesh);

    let fence3Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
    let fence3Mesh = new THREE.Mesh(fence3Geometry, material);
    fence3Mesh.position.set(3.8,1.2,0.9);
    group.add(fence3Mesh);



    let fence4Geometry = new THREE.CylinderGeometry(0.05, 0.05, 4.1);
    let fence4Mesh = new THREE.Mesh(fence4Geometry, material);
    fence4Mesh.position.set(3.4,1.2,0.9);
    fence4Mesh.rotateZ(Math.PI/2);
    group.add(fence4Mesh);

    let fence5Geometry = new THREE.CylinderGeometry(0.05, 0.05, 4.1);
    let fence5Mesh = new THREE.Mesh(fence5Geometry, material);
    fence5Mesh.position.set(3.4,1.7,0.9);
    fence5Mesh.rotateZ(Math.PI/2);
    group.add(fence5Mesh);

    let fence6Geometry = new THREE.CylinderGeometry(0.05, 0.05, 4.1);
    let fence6Mesh = new THREE.Mesh(fence6Geometry, material);
    fence6Mesh.position.set(3.4,2.2,0.9);
    fence6Mesh.rotateZ(Math.PI/2);
    group.add(fence6Mesh);


    let fence8Geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5);
    let fence8Mesh = new THREE.Mesh(fence8Geometry, material);
    fence8Mesh.position.set(5.4,1.5,0.9);
    group.add(fence8Mesh);

    return group;
}

export function createOperatorPartLeft() {
    let group = new THREE.Group();
    let material = new THREE.MeshStandardMaterial({metalness: 0.6, roughness:0.3});

    let leftPart = createOperatorLeftPartMesh();
    leftPart.position.set(0,0,-0.1);
    group.add(leftPart);

    let standingPlatformGeometry = new THREE.BoxGeometry(2.5, 0.1, 0.39);
    let standingPlatformMesh = new THREE.Mesh(standingPlatformGeometry, material);
    standingPlatformMesh.position.set(1.8,0.05,-0.3);
    group.add(standingPlatformMesh);


    let fence5Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2.4);
    let fence5Mesh = new THREE.Mesh(fence5Geometry, material);
    fence5Mesh.position.set(4.2,3.2,0);
    fence5Mesh.rotateZ(Math.PI/2);
    leftPart.add(fence5Mesh);

    let fence6Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2.4);
    let fence6Mesh = new THREE.Mesh(fence6Geometry, material);
    fence6Mesh.position.set(4.20,2.7,0);
    fence6Mesh.rotateZ(Math.PI/2);
    leftPart.add(fence6Mesh);

    let fence7Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2.4);
    let fence7Mesh = new THREE.Mesh(fence7Geometry, material);
    fence7Mesh.position.set(4.20,2.2,0);
    fence7Mesh.rotateZ(Math.PI/2);
    leftPart.add(fence7Mesh);

    let fence8Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
    let fence8Mesh = new THREE.Mesh(fence8Geometry, material);
    fence8Mesh.position.set(5.35,2.2,0);
    leftPart.add(fence8Mesh);

    let fence9Geometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
    let fence9Mesh = new THREE.Mesh(fence9Geometry, material);
    fence9Mesh.position.set(3.05,2.2,0);
    leftPart.add(fence9Mesh);

    return group;
}

export function createOperatorSeat() {
    let group = new THREE.Group();
    let operatorSeatMesh = createOperatorSeatMesh();
    operatorSeatMesh.position.set(0,0,0);
    operatorSeatMesh.scale.set(1,1,1);
    group.add(operatorSeatMesh);

    let standingPlatformGeometry = new THREE.BoxGeometry(2.15, 0.1, 0.6);
    let material = new THREE.MeshStandardMaterial({metalness: 0.6, roughness:0.3});
    let standingPlatformMesh = new THREE.Mesh(standingPlatformGeometry, material);
    standingPlatformMesh.position.set(1,-0.05,2.1);
    group.add(standingPlatformMesh);

    return group;
}


export function createOperatorBack() {
    const group = new THREE.Group();

    const backMesh = createOperatorBackMesh();
    group.add(backMesh);

    return group;
}