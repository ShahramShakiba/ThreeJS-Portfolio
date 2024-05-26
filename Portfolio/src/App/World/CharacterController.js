// Import necessary modules
import * as THREE from 'three';
import App from '../App.js';
import { inputStore } from '../Utils/Store.js';

export default class CharacterController {
  /**
   * Create a character controller.
   */
  constructor() {
    // Initialize app, scene, physics, and character properties
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.character = this.app.world.character.instance;

    // Subscribe to input store and update movement values
    inputStore.subscribe((state) => {
      this.forward = state.forward;
      this.backward = state.backward;
      this.left = state.left;
      this.right = state.right;
    });

    // Instantiate controller and create rigid body and collider
    this.instantiateController();
  }

  // Instantiate the character controller, rigid body, and collider.
  instantiateController() {
    // Create a kinematic rigid body
    this.rigidBodyType =
      this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
    this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

    // Create a cuboid collider
    this.colliderType = this.physics.rapier.ColliderDesc.cuboid(0.3, 1, 0.3);
    this.collider = this.physics.world.createCollider(
      this.colliderType,
      this.rigidBody
    );

    // Set rigid body position to character position
    const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
    const worldRotation = this.character.getWorldQuaternion(
      new THREE.Quaternion()
    );
    this.rigidBody.setTranslation(worldPosition);
    this.rigidBody.setRotation(worldRotation);

    // Create character controller, set properties, and enable auto-stepping
    this.characterController =
      this.physics.world.createCharacterController(0.01);
    this.characterController.setApplyImpulsesToDynamicBodies(true);
    // steps height
    this.characterController.enableAutostep(1, 0.1, false);
    this.characterController.enableSnapToGround(1);
  }

  // Loop function that updates the character's position and movement.
  loop() {
    // Initialize movement vector based on input values
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

    // if Player is moving
    if (movement.length() !== 0) {
      const angle = Math.atan2(movement.x, movement.z) + Math.PI;
      const characterRotation = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angle
      );
      this.character.quaternion.slerp(characterRotation, 0.1);
    }

    // Normalize and scale movement vector and set y component to -1
    movement.normalize().multiplyScalar(0.3); // speed
    movement.y = -1;

    // Update collider movement and get new position of rigid body
    this.characterController.computeColliderMovement(this.collider, movement);
    const newPosition = new THREE.Vector3()
      .copy(this.rigidBody.translation())
      .add(this.characterController.computedMovement());

    // Set next kinematic translation of rigid body and update character position
    this.rigidBody.setNextKinematicTranslation(newPosition);
    this.character.position.lerp(this.rigidBody.translation(), 0.1);
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
