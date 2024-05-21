import * as THREE from 'three';
import App from '../App.js';
import RAPIER from '@dimforge/rapier3d';

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import('@dimforge/rapier3d').then((RAPIER) => {
      const gravity = { x: 0, y: -9.81, z: 0 };
      this.world = new RAPIER.World(gravity);
    });
  }

  loop() {}
}
