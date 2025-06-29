import * as THREE from "three";

export function createSupportArms(textureObjects) {
    let group = new THREE.Group();

    let supportArm1 = createSupportArm(textureObjects, "mySupportCylinderAndCone1");
    supportArm1.name = "mySupportArm1";
    supportArm1.position.set(5, 0, 2.5);
    group.add(supportArm1);

    let supportArm2 = createSupportArm(textureObjects, "mySupportCylinderAndCone2");
    supportArm2.name = "mySupportArm2";
    supportArm2.position.set(5, 0, -13.5);
    group.add(supportArm2);

    let supportArm3 = createSupportArm(textureObjects, "mySupportCylinderAndCone3");
    supportArm3.name = "mySupportArm3";
    supportArm3.position.set(-5, 0, 2.5);
    supportArm3.rotateY(Math.PI);
    group.add(supportArm3);

    let supportArm4 = createSupportArm(textureObjects, "mySupportCylinderAndCone4");
    supportArm4.name = "mySupportArm4";
    supportArm4.position.set(-5, 0, -13.5);
    supportArm4.rotateY(Math.PI);
    group.add(supportArm4);

    return group;
}

export function createSupportArm(textureObjects, supportCylinderAndConeName) {
    let group = new THREE.Group();

    let supportGeometry = new THREE.BoxGeometry(5, 1.2, 0.5);
    let supportMaterial = new THREE.MeshStandardMaterial({color: 0x444444});
    supportMaterial.metalness = 0.8;
    supportMaterial.roughness = 0.1;
    supportMaterial.envMap = textureObjects[1];
    let supportMesh = new THREE.Mesh(supportGeometry, supportMaterial);
    group.add(supportMesh);

    let supportCylinderAndCone = createSupportCylinderAndCone(textureObjects);
    supportCylinderAndCone.position.set(2.25, -1, 0);
    supportCylinderAndCone.name = supportCylinderAndConeName;
    group.add(supportCylinderAndCone)

    return group;
}

export function createSupportCylinderAndCone(textureObjects) {
    let group = new THREE.Group();

    let supportCylinderGeometry = new THREE.CylinderGeometry(0.125,0.125,1);
    let supportCylinderMaterial = new THREE.MeshStandardMaterial({color: 0xaaaaaa, metalness:0.6, roughness: 0.5});
    let supportCylinderMesh = new THREE.Mesh(supportCylinderGeometry, supportCylinderMaterial);
    group.add(supportCylinderMesh);

    let supportConeGeometry = new THREE.ConeGeometry(0.5,0.25);
    let supportConeMaterial = new THREE.MeshStandardMaterial({color: 0x222222});
    supportConeMaterial.metalness = 0.8;
    supportConeMaterial.roughness = 0.1;
    supportConeMaterial.envMap = textureObjects[1];
    let supportConeMesh = new THREE.Mesh(supportConeGeometry, supportConeMaterial);
    supportConeMesh.position.set(0, -0.5, 0);
    group.add(supportConeMesh);

    return group;
}