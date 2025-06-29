import * as THREE from "three";


export function createPlaneMesh(width=1000, height = 1000) {
    const geometry = new THREE.PlaneGeometry( width, height );
    const material = new THREE.MeshStandardMaterial( {color: 0x4caf50, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );

    return plane;
}