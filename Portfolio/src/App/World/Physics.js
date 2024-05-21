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
      this.cubeMesh.position.y = 12;
      this.cubeMesh.rotation.x = 15;
      this.cubeMesh.rotation.z = 20;
      this.scene.add(this.cubeMesh);

      const groundGeometry = new THREE.BoxGeometry(10, 1, 10);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 'turquoise',
      });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.scene.add(this.groundMesh);

      //===== 03. Create the Rigid Body(represent the Mesh in physical-world)
      //cube rigidBody
      const rigidBodyType = RAPIER.RigidBodyDesc.dynamic();
      this.rigidBody = this.world.createRigidBody(rigidBodyType);
      //make the physic-engine respect the position or rotation of cubeMesh
      this.rigidBody.setTranslation(this.cubeMesh.position);
      this.rigidBody.setRotation(this.cubeMesh.quaternion);

      const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
      this.world.createCollider(colliderType, this.rigidBody);

      //ground rigidBody
      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

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
