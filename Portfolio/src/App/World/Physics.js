import * as THREE from 'three';
import App from '../App.js';
import { appStateStore } from '../Utils/Store.js';

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.meshMap = new Map();

    import('@dimforge/rapier3d').then((RAPIER) => {
      // Setup the Physics World
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);
      this.rapier = RAPIER;

      // Create Mesh
      const groundGeometry = new THREE.BoxGeometry(20, 1, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 'turquoise',
      });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.scene.add(this.groundMesh);

      //====== 03.Create the Rigid Body(represent the Mesh in physical-world)
      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);

      const groundColliderType = RAPIER.ColliderDesc.cuboid(10, 0.5, 10);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

      //run the loop-method only when rapier has been loaded
      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  // Adding a Mesh to the Physics-Simulation.
  add(mesh) {
    const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    this.rigidBody = this.world.createRigidBody(rigidBodyType);
    const worldPosition = mesh.getWorldPosition(new THREE.Vector3());
    const worldRotation = mesh.getWorldQuaternion(new THREE.Quaternion());

    //make the physic-engine respect the position or rotation of Mesh
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    //autoCompute collider dimensions
    const dimensions = this.computeCuboidDimensions(mesh);

    const colliderType = this.rapier.ColliderDesc.cuboid(
      dimensions.x / 2,
      dimensions.y / 2,
      dimensions.z / 2
    );
    this.world.createCollider(colliderType, this.rigidBody);

    this.meshMap.set(mesh, this.rigidBody);
  }

  computeCuboidDimensions(mesh) {
    mesh.geometry.computeBoundingBox();
    const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    size.multiply(worldScale);

    return size;
  }

  // Update the scene based on the physics-simulation.
  loop() {
    if (!this.rapierLoaded) return;

    // Advances the physics simulation by one-step
    this.world.step();

    this.meshMap.forEach((rigidBody, mesh) => {
      // Store... & avoid modifying the original data
      const position = new THREE.Vector3().copy(rigidBody.translation());
      const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

      // adjusts the position based on the parent-matrix
      position.applyMatrix4(
        new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert()
      );

      // Extract the rotational component of the parent's matrix and invert it
      const inverseParentMatrix = new THREE.Matrix4()
        .extractRotation(mesh.parent.matrixWorld)
        .invert();

      // Create a quaternion from the inverted rotational matrix
      const inverseParentRotation =
        new THREE.Quaternion().setFromRotationMatrix(inverseParentMatrix);
      // Apply the inverse rotation to the rigid-body's-rotation
      rotation.premultiply(inverseParentRotation);

      // Update the mesh's position and rotation
      mesh.position.copy(position);
      mesh.quaternion.copy(rotation);
    });
  }
}
