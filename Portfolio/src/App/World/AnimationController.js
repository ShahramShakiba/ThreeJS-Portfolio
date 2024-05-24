import * as THREE from 'three';
import App from '../App';

export default class AnimationController {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.avatar = this.app.world.character.avatar;

    this.instantiateAnimations();
  }

  instantiateAnimations() {
    const idle = this.avatar.animations[1];
    this.mixer = new THREE.AnimationMixer(this.avatar.scene);
    const idleAction = this.mixer.clipAction(idle);
    idleAction.play();
  }

  loop(deltaTime) {
    this.mixer.update(deltaTime);
  }
}
