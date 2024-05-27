import * as THREE from 'three';
import App from '../App';

export default class Loop {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.world = this.app.world;
    this.clock = new THREE.Clock();
    this.previousElapsedTime = 0;
    this.loop();
  }

  loop() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousElapsedTime;
    this.previousElapsedTime = elapsedTime;
    this.camera.loop();
    this.renderer.loop();
    this.world.loop(deltaTime, elapsedTime);
    window.requestAnimationFrame(() => this.loop());
  }
}
