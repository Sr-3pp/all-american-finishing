import * as THREE from 'three'

export class FBChannel {
    config = {
        width: 1,
        height: 1,
        segments: {
            x: 3,
            y: 3,
            z: 3
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
        if (segments) {
            this.config.segments = segments
        }

        this.mesh = this.buildMesh()
    }

    buildMesh() {
        const geometry = new THREE.PlaneGeometry(this.config.width, this.config.height, this.config.segments.x, this.config.segments.z);

        // Get the position attribute
        const positionAttribute = geometry.getAttribute('position');

        const limit = {
            start: this.config.segments.x + 1,
            end: this.config.segments.x - 1
        }

        // Modify vertex data in position attribute
        for (let i = 0; i < positionAttribute.count; i++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positionAttribute, i);
            const last_vertex = new THREE.Vector3();
            last_vertex.fromBufferAttribute(positionAttribute, i + this.config.segments.x);

            if (i % limit.start == 0) {
                const v2 = new THREE.Vector3();
                v2.fromBufferAttribute(positionAttribute, 1);

                const vlast_ref = new THREE.Vector3();
                vlast_ref.fromBufferAttribute(positionAttribute, (i + this.config.segments.x) - 1);
                // Modify x and y coordinates of vertex

                function rotatePoint(x: number, y: number, angle: number) {
                    const radians = (Math.PI / 180) * angle,
                        cos = Math.cos(radians),
                        sin = Math.sin(radians),
                        nx = (cos * x) - (sin * y),
                        ny = (sin * x) + (cos * y);
                    return [nx, ny];
                }

                const [x1, z1] = rotatePoint(vertex.x, vertex.z, 45)

                vertex.x = x1
                vertex.z = z1

                //vertex.x = v2.x;
                //vertex.z = -1;
                last_vertex.x = vlast_ref.x;
                last_vertex.z = -1
            }


            // Set modified vertex data back into position attribute
            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
            positionAttribute.setXYZ(i + this.config.segments.x, last_vertex.x, last_vertex.y, last_vertex.z);
        }

        // Make sure the changes are reflected
        positionAttribute.needsUpdate = true;


        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const mesh = markRaw(new THREE.Mesh(geometry, material))
        mesh.name = "FBChannel"
        return mesh
    }




}