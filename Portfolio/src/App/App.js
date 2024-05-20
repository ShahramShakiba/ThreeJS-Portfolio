import * as THREE from 'three';
import Camera from './Camera.js';
import Loop from './Utils/Loop.js';
import Renderer from './Renderer.js';

// to avoid maximum call stack size error
let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector('canvas.threejs');
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loop = new Loop();
  }
}
