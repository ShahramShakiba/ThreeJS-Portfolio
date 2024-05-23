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
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 'red',
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);

    this.scene.add(this.character);
    this.characterRigidBody = this.physics.add(
      this.character,
      'kinematic',
      'ball'
    );
  }

  loop() {
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
