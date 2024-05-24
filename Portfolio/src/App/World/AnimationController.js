import * as THREE from 'three';
import App from '../App';
import { inputStore } from '../Utils/Store';

export default class AnimationController {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.avatar = this.app.world.character.avatar;

    inputStore.subscribe((input) => this.onInput(input));

    this.instantiateAnimations();
  }

  instantiateAnimations() {
    const idle = this.avatar.animations[0];
    this.mixer = new THREE.AnimationMixer(this.avatar.scene);
    this.animations = new Map();
    this.avatar.animations.forEach((clip) => {
      this.animations.set(clip.name, this.mixer.clipAction(clip));
    });

    this.animations.get('idle').play();
  }

  onInput(input) {
    if (input.forward || input.backward || input.left || input.right) {
      this.animations.get('run').reset();
      this.animations.get('run').play();
      this.animations
        .get('run')
        .crossFadeFrom(this.animations.get('idle'), 0.3);
    } else {
      this.animations.get('idle').reset();
      this.animations.get('idle').play();
      this.animations
        .get('idle')
        .crossFadeFrom(this.animations.get('run'), 0.3);
    }
  }

  loop(deltaTime) {
    this.mixer.update(deltaTime);
  }
}
