import * as THREE from 'three';
import App from '../App.js';

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import('@dimforge/rapier3d').then((RAPIER) => {
      //===== 01. Setup the Physics World
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);

      //===== 02. Create Mesh
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 'yellow' });
      this.cubeMesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.cubeMesh);

      //===== 03. Create the Rigid Body(represent the Mesh in physical-world)
      const rigidBodyType = RAPIER.RigidBodyDesc.dynamic();
      this.rigidBody = this.world.createRigidBody(rigidBodyType);

      const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
      this.world.createCollider(colliderType, this.rigidBody);

      //run the loop-method only when rapier has been loaded
      this.rapierLoaded = true;
    });
  }

  loop() {
    if (!this.rapierLoaded) return;
    
    //===== 04. Update Mesh from physics-simulation
    this.world.step();
    const position = this.rigidBody.translation();
    const rotation = this.rigidBody.rotation();
    this.cubeMesh.position.copy(position);
    this.cubeMesh.quaternion.copy(rotation);
  }
}
