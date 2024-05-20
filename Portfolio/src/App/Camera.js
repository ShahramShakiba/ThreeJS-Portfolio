import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import App from './App';

export default class Camera {
  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.instance.position.z = 5;
  }
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  loop() {
    this.controls.update();
  }
}
