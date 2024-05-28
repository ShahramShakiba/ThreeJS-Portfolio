import * as THREE from 'three';
import App from '../App.js';
import Physics from './Physics.js';
import Character from './Character.js';
import Environment from './Environment.js';
import { appStateStore } from '../Utils/Store.js';
import CharacterController from './CharacterController.js';
import AnimationController from './AnimationController.js';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    //========= create World classes
    this.physics = new Physics();
    const unsub = appStateStore.subscribe((state) => {
      if (state.physicsReady && state.assetReady) {
        this.environment = new Environment();
        this.character = new Character();
        this.characterController = new CharacterController();
        this.animationController = new AnimationController();

        unsub();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
    if (this.environment) this.environment.loop();
    if (this.characterController) this.characterController.loop();
    if (this.animationController) this.animationController.loop(deltaTime);
  }
}
