import * as THREE from "three";


export let globalVars = {
    hookTime : 0,
    cumulativeTranslation: 0
}


export function animateSupportArm(supportArm, cylinder, supportArmsSpeed) {
    const position = supportArm.children[0].geometry.attributes.position;
    let vertexFound = false;
    let stop = false;
    // Example: Increase X position of vertices on one side
    for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        if (supportArmsSpeed < 0){
            if (x >= -2) { // Adjust this condition as needed
                position.setX(i, x + supportArmsSpeed);
                vertexFound = true;
            }
        }
        else {
            if (x >= -2.05) { // Adjust this condition as needed
                position.setX(i, x + supportArmsSpeed);
                vertexFound = true;
            }
        }

    }
    if (!vertexFound) stop = true;
    position.needsUpdate = true;
    if (!stop) {
        cylinder.position.x += supportArmsSpeed;
    }
}

export function animateSupportArms(supportArms, supportArmsSpeed) {
    let supportArm1 = supportArms.getObjectByName("mySupportArm1");
    let cylinder1 = supportArm1.getObjectByName("mySupportCylinderAndCone1");
    animateSupportArm(supportArm1, cylinder1, supportArmsSpeed);

    let supportArm2 = supportArms.getObjectByName("mySupportArm2");
    let cylinder2 = supportArm2.getObjectByName("mySupportCylinderAndCone2");
    animateSupportArm(supportArm2, cylinder2, supportArmsSpeed);

    let supportArm3 = supportArms.getObjectByName("mySupportArm3");
    let cylinder3 = supportArm3.getObjectByName("mySupportCylinderAndCone3");
    animateSupportArm(supportArm3, cylinder3, supportArmsSpeed);

    let supportArm4 = supportArms.getObjectByName("mySupportArm4");
    let cylinder4 = supportArm4.getObjectByName("mySupportCylinderAndCone4");
    animateSupportArm(supportArm4, cylinder4, supportArmsSpeed);
}

export function animateSupportCylinder(supportArmCylinder, supportArmsSpeed, unlock) {
    const cylinderPosition = supportArmCylinder.children[0].geometry.attributes.position;
    const cone = supportArmCylinder.children[1];

    let vertexFound = false;
    // Example: Increase X position of vertices on one side
    for (let i = 0; i < cylinderPosition.count; i++) {
        const y = cylinderPosition.getY(i);
            if (y <= 0.45) { // Adjust this condition as needed
                cylinderPosition.setY(i, y + supportArmsSpeed);
                vertexFound = true;
                console.log(y)
            }
            else if (y < 0.46 && unlock) {
                cylinderPosition.setY(i, y + supportArmsSpeed);
                vertexFound = true;
                console.log(y)
            }
    }
    cylinderPosition.needsUpdate = true;

    if (vertexFound) {
        cone.position.y += supportArmsSpeed;

    }
}

export function animateHookAndWire(wireLineMesh, lineMeshStartPosition, lineMeshEndPosition) {

    // Access the position attribute of the wire line mesh
    const positionAttribute = wireLineMesh.geometry.getAttribute("position");


    // Get the world position of the line start
    const lineStartPos = new THREE.Vector3();
    lineMeshStartPosition.getWorldPosition(lineStartPos);

    // Update the start vertex in the geometry with `lineStartPos` in local space
    wireLineMesh.worldToLocal(lineStartPos); // Transform back to local space for correct attribute setting
    positionAttribute.setXYZ(0, lineStartPos.x, lineStartPos.y, lineStartPos.z);

    // Get the world position of the line start
    const lineEndPos = new THREE.Vector3();
    lineMeshEndPosition.getWorldPosition(lineEndPos);

    // Update the start vertex in the geometry with `lineStartPos` in local space
    wireLineMesh.worldToLocal(lineEndPos); // Transform back to local space for correct attribute setting
    positionAttribute.setXYZ(1, lineEndPos.x, lineEndPos.y, lineEndPos.z);

    positionAttribute.needsUpdate = true;
}

export function animateHookAndWires(ri, wiresMesh) {

    let i = 1;
    wiresMesh.children.forEach((wireLineMesh) => {
        // Access the position attribute of the wire line mesh
        // Henter start- og endepunkt-mesh for å endre Line-geometrien:
        let lineMeshStartPosition = ri.scene.getObjectByName('leverArmJoint' + i);
        let lineMeshEndPosition = ri.scene.getObjectByName('hookJoint' + i);
        const positionAttribute = wireLineMesh.geometry.getAttribute("position");

        // Get the world position of the line start
        const lineStartPos = new THREE.Vector3();
        lineMeshStartPosition.getWorldPosition(lineStartPos);

        // Update the start vertex in the geometry with `lineStartPos` in local space
        wireLineMesh.worldToLocal(lineStartPos); // Transform back to local space for correct attribute setting
        positionAttribute.setXYZ(0, lineStartPos.x, lineStartPos.y, lineStartPos.z);

        // Get the world position of the line start
        const lineEndPos = new THREE.Vector3();
        lineMeshEndPosition.getWorldPosition(lineEndPos);

        // Update the start vertex in the geometry with `lineStartPos` in local space
        wireLineMesh.worldToLocal(lineEndPos); // Transform back to local space for correct attribute setting
        positionAttribute.setXYZ(1, lineEndPos.x, lineEndPos.y, lineEndPos.z);

        positionAttribute.needsUpdate = true;

        i++;
    })

}