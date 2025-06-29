import * as THREE from "three";

export function createPointsForHookWire(lineMeshStartPosition, lineMeshEndPosition) {
    const points = [];
    const startPoint = new THREE.Vector3();
    const endPoint = new THREE.Vector3();
    // NB! Bruker world-position:
    lineMeshStartPosition.getWorldPosition(startPoint);
    lineMeshEndPosition.getWorldPosition(endPoint);
    points.push(startPoint);
    points.push(endPoint);

    return points;
}


export function alignPositionWithYOffset(sourceObject, targetObject, targetY) {
    // Create temporary vectors to avoid reallocating memory on each call
    const worldPos = new THREE.Vector3();

    // Get the target's world position
    targetObject.localToWorld(worldPos);

    // Set the desired position, keeping x and z the same and adjusting the y-coordinate
    worldPos.setY(targetY);

    // Convert this world position to the source object's local space and apply it
    sourceObject.position.copy(sourceObject.worldToLocal(worldPos));
}


export function setCastShadowForAllChildren(object, castShadow) {
    object.traverse((child) => {
        if (child.isGroup || child.isMesh) {
            child.castShadow = castShadow;
        }
    });
}
