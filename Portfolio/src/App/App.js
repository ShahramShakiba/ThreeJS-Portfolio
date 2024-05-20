import * as THREE from 'three';
import Camera from './Camera.js';
import Loop from './Utils/Loop.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resize from './Utils/Resize.js';
import AssetLoader from './Utils/AssetLoader.js';

// to avoid maximum call stack size error
let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;
    //^^^^^^ Threejs Elements
    this.canvas = document.querySelector('canvas.threejs');
    this.scene = new THREE.Scene();

    //^^^^^^ Asset Loader
    this.assetLoader = new AssetLoader();

    //^^^^^^ Camera & Renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    //^^^^^^ World
    this.world = new World();

    //^^^^^^ Extra Utils
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
