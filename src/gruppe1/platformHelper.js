import * as THREE from "three";
import {
    createCylinderMesh,
    createLadderPart,
    createWheelMesh,
    createWheelRimMesh,
    createWheelRimSurfaceMesh
} from "./meshes.js";

export function createWheels() {
    const height = -2.2;
    const width = 1.8;
    const widthRightSide = 2.8;

    let group = new THREE.Group();

    let frontWheels = createFrontWheels();
    frontWheels.name = "myFrontWheels";
    frontWheels.animation = {angle: 0};
    group.add(frontWheels);


    let wheel3 = createWheel();
    wheel3.position.set(width, height, -2.7);
    wheel3.rotateY(Math.PI / 2);
    group.add(wheel3);

    let wheel4 = createWheel();
    wheel4.position.set(width, height, -6);
    wheel4.rotateY(Math.PI / 2);
    group.add(wheel4);

    let wheel5 = createWheel();
    wheel5.position.set(width, height, -9.3);
    wheel5.rotateY(Math.PI / 2);
    group.add(wheel5);



    let wheel8 = createWheel();
    wheel8.position.set(-widthRightSide, height, -2.7);
    wheel8.rotateY(Math.PI / 2);
    group.add(wheel8);

    let wheel9 = createWheel();
    wheel9.position.set(-widthRightSide, height, -6);
    wheel9.rotateY(Math.PI / 2);
    group.add(wheel9);

    let wheel10 = createWheel();
    wheel10.position.set(-widthRightSide, height, -9.3);
    wheel10.rotateY(Math.PI / 2);
    group.add(wheel10);


    return group;
}

export function createFrontWheels() {
    const group = new THREE.Group();

    const frontFrontWheels = createFrontFrontWheels();
    frontFrontWheels.name = "myFrontFrontWheels";
    group.add(frontFrontWheels);

    const frontBackWheels = createFrontBackWheels();
    frontBackWheels.name = "myFrontBackWheels";
    group.add(frontBackWheels);

    return group;
}

export function createFrontFrontWheels() {
    const height = -2.2;
    const width = 1.8;
    const widthRightSide = 2.8;


    const group = new THREE.Group();

    let wheel1 = createWheel();
    wheel1.position.set(width, height, 7);
    wheel1.rotateY(Math.PI / 2);
    group.add(wheel1);

    let wheel6 = createWheel();
    wheel6.position.set(-widthRightSide, height, 7);
    wheel6.rotateY(Math.PI / 2);
    group.add(wheel6);

    return group;
}

export function createFrontBackWheels() {
    const height = -2.2;
    const width = 1.8;
    const widthRightSide = 2.8;

    const group = new THREE.Group();

    let wheel2 = createWheel();
    wheel2.position.set(width, height, 3.7);
    wheel2.rotateY(Math.PI / 2);
    group.add(wheel2);

    let wheel7 = createWheel();
    wheel7.position.set(-widthRightSide, height, 3.7);
    wheel7.rotateY(Math.PI / 2);
    group.add(wheel7);

    return group;
}

export function createWheel() {
    const group = new THREE.Group();

    const wheelTire = createWheelMesh();
    group.add(wheelTire);

    const wheelRim = createWheelRimMesh();
    wheelRim.position.set(0,0,0);
    group.add(wheelRim);

    const wheelRimSurface = createWheelRimSurfaceMesh()
    wheelRimSurface.rotateX(Math.PI/2);
    wheelRimSurface.position.set(0, 0, 0.5);
    wheelRim.add(wheelRimSurface);

    const wheelHub = createCylinderMesh(0.3,0.3, 0.3, 50, 0x222222);
    wheelRimSurface.add(wheelHub);

    const wheelBolts = createWheelBolts();
    wheelBolts.position.set(0,0.1,0);
    wheelRimSurface.add(wheelBolts);

    return group;
}

export function createWheelBolts() {
    const distance = 0.37;
    const group = new THREE.Group();

    const bolt1 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    // bolt1.position.set(0,0,distance);
    bolt1.translateOnAxis(new THREE.Vector3(1, 0, 0), distance);
    group.add(bolt1);

    const bolt2 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt2.translateOnAxis(new THREE.Vector3(3**0.5/2, 0, 0.5), distance);
    group.add(bolt2);

    const bolt3 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt3.translateOnAxis(new THREE.Vector3(0.5, 0, 3**0.5/2), distance);
    group.add(bolt3);

    const bolt4 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt4.translateOnAxis(new THREE.Vector3(0, 0, 1), distance);
    group.add(bolt4);

    const bolt5 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt5.translateOnAxis(new THREE.Vector3(-0.5, 0, 3**0.5/2), distance);
    group.add(bolt5);

    const bolt6 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt6.translateOnAxis(new THREE.Vector3(-(3**0.5/2), 0, 0.5), distance);
    group.add(bolt6);

    const bolt7 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt7.translateOnAxis(new THREE.Vector3(-1, 0, 0), distance);
    group.add(bolt7);

    const bolt8 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt8.translateOnAxis(new THREE.Vector3(-(3**0.5/2), 0, -0.5), distance);
    group.add(bolt8);

    const bolt9 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt9.translateOnAxis(new THREE.Vector3(-0.5, 0, -(3**0.5/2)), distance);
    group.add(bolt9);

    const bolt10 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt10.translateOnAxis(new THREE.Vector3(0, 0, -1), distance);
    group.add(bolt10);

    const bolt11 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt11.translateOnAxis(new THREE.Vector3(0.5, 0, -(3**0.5/2)), distance);
    group.add(bolt11);


    const bolt12 = createCylinderMesh(0.05,0.05, 0.1, 50, 0xbbbbbb);
    bolt12.translateOnAxis(new THREE.Vector3(3**0.5/2, 0, -0.5), distance);
    group.add(bolt12);

    return group;
}

export function createLadder() {
    let group = new THREE.Group();
    let ladderPart1 = createLadderPart();
    group.add(ladderPart1);

    let ladderPart2 = createLadderPart();
    ladderPart2.position.set(0, 0.5, 0);
    group.add(ladderPart2);

    let ladderPart3 = createLadderPart();
    ladderPart3.position.set(0, 1, 0);
    group.add(ladderPart3);

    let ladderPart4 = createLadderPart();
    ladderPart4.position.set(0, 1.5, 0);
    group.add(ladderPart4);

    let ladderPart5 = createLadderPart();
    ladderPart5.position.set(0, 2, 0);
    group.add(ladderPart5);


    let ladderPart6 = createLadderPart();
    ladderPart6.position.set(-0.1, 1, 0.55);
    ladderPart6.rotateX(Math.PI /2);
    ladderPart6.scale.set(1,1,1.75);
    group.add(ladderPart6);


    let ladderPart7 = createLadderPart();
    ladderPart7.position.set(-0.1, 1, -0.55);
    ladderPart7.rotateX(Math.PI /2);
    ladderPart7.scale.set(1,1,1.75);
    group.add(ladderPart7);

    return group;
}
