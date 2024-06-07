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
      //run the loop-method only when physics-engine has been loaded
      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh, type, collider) {
    //=====defining the "rigid-body" type
    let rigidBodyType;
    switch (type) {
      case 'dynamic':
        rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
        break;
      case 'fixed':
        rigidBodyType = this.rapier.RigidBodyDesc.fixed();
        break;
      case 'kinematic':
        rigidBodyType = this.rapier.RigidBodyDesc.kinematicPositionBased();
        break;
    }
    this.rigidBody = this.world.createRigidBody(rigidBodyType);

    //=====defining the "collider" type
    let colliderType;
    switch (collider) {
      case 'cuboid':
        const dimensions = this.computeCuboidDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.cuboid(
          dimensions.x / 2,
          dimensions.y / 2,
          dimensions.z / 2
        );
        this.world.createCollider(colliderType, this.rigidBody);
        break;
      case 'ball':
        const radius = this.computeBallDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.ball(radius);
        this.world.createCollider(colliderType, this.rigidBody);
        break;
      case 'trimesh':
        const { scaleVertices, indices } = this.computeTrimeshDimensions(mesh);
        colliderType = this.rapier.ColliderDesc.trimesh(scaleVertices, indices);
        this.world.createCollider(colliderType, this.rigidBody);
        break;
    }

    //=====setting the rigid-body position & rotation
    const worldPosition = mesh.getWorldPosition(new THREE.Vector3());
    const worldRotation = mesh.getWorldQuaternion(new THREE.Quaternion());
    //match rigid-body's-position & rotation to the mesh's world position
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    this.meshMap.set(mesh, this.rigidBody);
    return this.rigidBody;
  }

  // Compute the Dimensions of the mesh's bounding box.
  computeCuboidDimensions(mesh) {
    mesh.geometry.computeBoundingBox();
    const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    size.multiply(worldScale);
    return size;
  }

  computeBallDimensions(mesh) {
    mesh.geometry.computeBoundingSphere();
    const radius = mesh.geometry.boundingSphere.radius;
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z);
    return radius * maxScale;
  }

  computeTrimeshDimensions(mesh) {
    const vertices = mesh.geometry.attributes.position.array;
    const indices = mesh.geometry.index.array;
    const worldScale = mesh.getWorldScale(new THREE.Vector3());
    const scaleVertices = vertices.map((vertex, index) => {
      return vertex * worldScale.getComponent(index % 3);
    });
    return { scaleVertices, indices };
  }

  loop() {
    if (!this.rapierLoaded) return;
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
