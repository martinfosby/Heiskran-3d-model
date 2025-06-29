import * as THREE from "three";
import {
    createHookBasePart1Mesh,
    createHookBasePart2Mesh,
    createHookLinesMesh,
    createHookMesh,
    createPointMesh
} from "./meshes.js";

export function createHook(textureObjects) {
    let group = new THREE.Group();

    let hookBasePart1Mesh = createHookBasePart1Mesh(textureObjects);
    group.add(hookBasePart1Mesh);

    let hookBasePart2Mesh = createHookBasePart2Mesh(textureObjects);
    hookBasePart2Mesh.position.set(0, -1, 0.125);
    group.add(hookBasePart2Mesh);

    let hookMesh = createHookMesh(textureObjects);
    hookMesh.position.set(0, -1.7, 0.125);
    group.add(hookMesh);

    let hookCloseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.25);
    let hookCloseMaterial = new THREE.MeshStandardMaterial({color:0x333333});
    let hookCloseMesh = new THREE.Mesh(hookCloseGeometry, hookCloseMaterial);
    hookCloseMesh.position.set(-0.25, -2, 0.25);
    hookCloseMesh.rotateZ(Math.PI /4);
    group.add(hookCloseMesh);


    let point1 = createPointMesh();
    point1.position.set(-0.5, -0.5, 0.5);
    point1.name = "hookJoint1";
    group.add(point1);

    let point2 = createPointMesh();
    point2.position.set(-0.5, -0.5, 0);
    point2.name = "hookJoint2";
    group.add(point2);

    let point3 = createPointMesh();
    point3.position.set(0.5, -0.5, 0);
    point3.name = "hookJoint3";
    group.add(point3);

    let point4 = createPointMesh();
    point4.position.set(0.5, -0.5, 0.5);
    point4.name = "hookJoint4";
    group.add(point4);

    return group;
}

export function createHookLines(wire1, wire2, wire3, wire4) {
    let group = new THREE.Group();

    let hookLineMesh1 = createHookLinesMesh(wire1);
    hookLineMesh1.name = "wireMesh1";
    group.add(hookLineMesh1);

    let hookLineMesh2 = createHookLinesMesh(wire2);
    hookLineMesh2.name = "wireMesh2";
    group.add(hookLineMesh2);

    let hookLineMesh3 = createHookLinesMesh(wire3);
    hookLineMesh3.name = "wireMesh3";
    group.add(hookLineMesh3);

    let hookLineMesh4 = createHookLinesMesh(wire4);
    hookLineMesh4.name = "wireMesh4";
    group.add(hookLineMesh4);

    return group;
}


