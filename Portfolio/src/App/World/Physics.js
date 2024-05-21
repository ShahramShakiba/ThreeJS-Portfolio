import * as THREE from 'three';
import App from '../App.js';
import { appStateStore } from '../Utils/Store.js';

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.meshMap = new Map();

    import('@dimforge/rapier3d').then((RAPIER) => {
      //========== 01.Setup the Physics World
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);
      this.rapier = RAPIER;

      //========== 02.Create Mesh
      const groundGeometry = new THREE.BoxGeometry(10, 1, 10);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 'turquoise',
      });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.scene.add(this.groundMesh);

      //====== 03.Create the Rigid Body(represent the Mesh in physical-world)
      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

      //run the loop-method only when rapier has been loaded
      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh) {
    //============ 03.Create the Rigid Body
    const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    this.rigidBody = this.world.createRigidBody(rigidBodyType);
    //make the physic-engine respect the position or rotation of Mesh
    this.rigidBody.setTranslation(mesh.position);
    this.rigidBody.setRotation(mesh.quaternion);

    //autoCompute collider dimensions

    const colliderType = this.rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5);
    this.world.createCollider(colliderType, this.rigidBody);

    this.meshMap.set(mesh, this.rigidBody);
  }

  loop() {
    if (!this.rapierLoaded) return;

    //===== 04. Update Mesh from physics-simulation
    this.world.step();
    
    this.meshMap.forEach((rigidBody, mesh) => {
      const position = rigidBody.translation();
      const rotation = rigidBody.rotation();
      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
