import * as THREE from 'three';
import App from '../App';
import Physics from './Physics.js';
import Environment from './Environment.js';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    //===== create World classes
    this.physics = new Physics();
    this.environment = new Environment();

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
