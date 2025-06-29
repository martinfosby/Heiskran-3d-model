import * as THREE from "three";
import {
    createVehicleBaseMesh,
    createVehicleBaseMesh1,
    createVehicleBaseMesh2,
    createVehicleBaseMesh3,
    createVehicleBaseMesh4, createBoxMesh, createVehicleBaseMesh5, createVehicleBaseMesh6
} from "./meshes.js";
import {createLadder, createWheels} from "./platformHelper.js";
import {createOperatorCab} from "./operatorHelper.js";
import {createExhaust, createFront} from "./frontHelper.js";
import {createSupportArms} from "./supportArmsHelpers.js";

export function createVehicle(textureObjects) {
    let group = new THREE.Group();
    let craneBase = createVehicleBase();
    group.add(craneBase);

    let exhaust = createExhaust();
    exhaust.position.set(0, 1.1, 7);
    group.add(exhaust);

    let supportArms = createSupportArms(textureObjects);
    supportArms.position.set(0, -0.2, -0.25);
    supportArms.name = "mySupportArms";
    group.add(supportArms);

    let front = createFront(textureObjects);
    front.position.set(0, -0.4, 11);
    group.add(front);

    let back = createBoxMesh(5, 2, 2, 0xff0000);
    back.position.set(0, -0.5, -13.3);
    group.add(back);

    let redPlatform = createBoxMesh(2, 0.0001, 15, 0xff0000);
    redPlatform.position.set(0, 0.501, -4.8);
    group.add(redPlatform);

    let wheels = createWheels();
    wheels.scale.set(1.1,1.1,1.1);
    group.add(wheels);

    let operatorCab = createOperatorCab(textureObjects);
    operatorCab.name = "myOperatorCab";
    operatorCab.animation = { angle: Math.PI/2 };
    operatorCab.position.set(1,0.5,-1.2);
    operatorCab.scale.setY(1.5);
    operatorCab.scale.setX(1.7);
    group.add(operatorCab);




    let ladder1 = createLadder();
    ladder1.position.set(-2.82,-1.55,-0.5);
    ladder1.scale.set(1.22,1,0.83);
    group.add(ladder1);

    let ladder2 = createLadder();
    ladder2.position.set(2.82,-1.55,-0.5);
    ladder2.scale.set(1.22,1,0.83);
    ladder2.rotateY(Math.PI);
    group.add(ladder2);

    return group;
}



export function createVehicleBase() {
    let group = new THREE.Group();

    // let craneBaseMesh1 = createVehicleBaseMesh(6, 1, 9);
    // craneBaseMesh1.position.set(0,0, 4.5);
    // group.add(craneBaseMesh1);

    // let craneBaseMesh1 = createVehicleBaseMesh(6, 1, 2);
    // craneBaseMesh1.position.set(0,0, 1);
    // group.add(craneBaseMesh1);

    let craneBaseMesh2 = createVehicleBaseMesh(5.5, 1, 1);
    craneBaseMesh2.position.set(0,0, -0.5);
    group.add(craneBaseMesh2);

    const vehicleBaseMesh1 = createVehicleBaseMesh1();
    vehicleBaseMesh1.position.set(-3, -0.5, -1);
    vehicleBaseMesh1.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh1);

    const vehicleBaseMesh2 = createVehicleBaseMesh2();
    vehicleBaseMesh2.position.set(-3, -0.5, -1);
    vehicleBaseMesh2.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh2);

    const vehicleBaseMesh3 = createVehicleBaseMesh3();
    vehicleBaseMesh3.position.set(-3, -0.5, -1);
    vehicleBaseMesh3.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh3);

    const vehicleBaseMesh4 = createVehicleBaseMesh4();
    vehicleBaseMesh4.position.set(-3, -0.5, -1);
    vehicleBaseMesh4.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh4);


    const vehicleBaseMesh5 = createVehicleBaseMesh5();
    vehicleBaseMesh5.position.set(-3,-0.5, 0);
    vehicleBaseMesh5.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh5);

    const vehicleBaseMesh6 = createVehicleBaseMesh6();
    vehicleBaseMesh6.position.set(-3,-0.5, 0);
    vehicleBaseMesh6.rotateY(Math.PI/2);
    group.add(vehicleBaseMesh6);

    return group;
}






