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
    const geometry = new THREE.SphereGeometry(2, 12, 12);
    const material = new THREE.MeshStandardMaterial({
      color: 'red',
      wireframe: true,
    });
    this.character = new THREE.Mesh(geometry, material);
    this.character.position.set(0, 2.5, 0);

    this.scene.add(this.character);
    this.characterRigidBody = this.physics.add(
      this.character,
      'dynamic',
      'ball'
    );
  }

  loop() {
    if (this.forward) {
      // this.characterRigidBody.applyImpulse({ x: 0, y: 0, z: -3 }, true);
      this.characterRigidBody.applyTorqueImpulse({ x: -2, y: 0, z: 0 }, true);
    }
    if (this.backward) {
      this.character.position.z += 0.1;
    }
    if (this.left) {
      this.character.position.x -= 0.1;
    }
    if (this.right) {
      this.character.position.x += 0.1;
    }
  }
}
