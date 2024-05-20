import * as THREE from 'three';
import Camera from './Camera.js';

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;
    
    this.canvas = document.querySelector('canvas.threejs');
    this.scene = new THREE.Scene();
    this.camera = new Camera();
  }
}
