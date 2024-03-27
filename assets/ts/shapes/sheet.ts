import * as THREE from 'three'

export class FBSheet {
    config = {
        width: 1,
        height: 1,
        segments: {
            x: 1,
            y: 1,
            z: 1
        },
        scale: {
            x: 1,
            y: 1,
            z: 1
        }
    }
    mesh;


    constructor({ width, height, segments }: any) {
        this.config.width = width
        this.config.height = height
        this.config.segments = segments

        this.mesh = this.buildMesh()
    }

    buildMesh() {
        const geometry = new THREE.PlaneGeometry(this.config.width, this.config.height, this.config.scale.x, this.config.scale.y);


        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const mesh = markRaw(new THREE.Mesh(geometry, material))
        mesh.name = "FBChannel"
        mesh.rotateX(2)

        return mesh
    }




}