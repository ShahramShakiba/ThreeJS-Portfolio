import * as THREE from 'three';
import App from '../App';
import Physics from './Physics.js';
import Character from './Character.js';
import Environment from './Environment.js';
import { appStateStore } from '../Utils/Store.js';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    
    //========= create World classes
    this.physics = new Physics();
    appStateStore.subscribe((state) => {
      if (state.physicsReady) {
        this.environment = new Environment();
        this.character = new Character();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
