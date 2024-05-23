import * as THREE from 'three';
import App from '../App.js';
import { inputStore } from '../Utils/Store.js';

export default class Character {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    this.instantiateCharacter();
  }

  instantiateCharacter() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 'red',
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);
    this.scene.add(this.character);

    // create a rigid body
    this.rigidBodyType =
      this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
    this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

    // create a collider
    this.colliderType = this.physics.rapier.ColliderDesc.cuboid(1, 1, 1);
    this.collider = this.physics.world.createCollider(
      this.colliderType,
      this.rigidBody
    );

    // set rigid-body position to character position
    const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
    const worldRotation = this.character.getWorldQuaternion(
      new THREE.Quaternion()
    );
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    this.characterController =
      this.physics.world.createCharacterController(0.01);
  }

  loop() {
    const movement = new THREE.Vector3();
    if (this.forward) {
      movement.z -= 1;
    }
    if (this.backward) {
      movement.z += 1;
    }
    if (this.left) {
      movement.x -= 1;
    }
    if (this.right) {
      movement.x += 1;
    }

    movement.normalize().multiplyScalar(0.3);

    this.characterController.computeColliderMovement(this.collider, movement);

    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.translation())
      .add(this.characterController.computedMovement());
    this.rigidBody.setNextKinematicTranslation(newPosition);

    this.character.position.copy(this.rigidBody.translation());
  }
}

/* Use Force to move object
01. this.characterRigidBody.applyImpulse({ x: 0, y: 0, z: -3 }, true);

02. this.characterRigidBody.applyTorqueImpulse({ x: -2, y: 0, z: 0 }, true);
*/

/* Use kinematicVelocityBased
    By default:
    this.characterRigidBody.setLinvel({ x: 0, y: 0, z: 0 });
    let x = 0;
    let y = 0;
    let z = 0;
*/

/* Use kinematicPositionBased
let { x, y, z } = this.characterRigidBody.translation();
    if (this.forward) {
      z -= 0.5;
    }
    if (this.backward) {
      z += 0.5;
    }
    if (this.left) {
      x -= 0.5;
    }
    if (this.right) {
      x += 0.5;
    }

this.characterRigidBody.setNextKinematicTranslation({ x, y, z });
*/
