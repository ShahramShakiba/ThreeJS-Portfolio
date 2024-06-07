import * as THREE from 'three';
import Camera from './Camera.js';
import GUI from './Utils/GUI.js';
import Loop from './Utils/Loop.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resize from './Utils/Resize.js';
import Preloader from '/App/UI/Preloader.js';
import ModalManager from './UI/ModalManager.js';
import AssetLoader from './Utils/AssetLoader.js';
import InputController from './UI/InputController.js';

// to avoid maximum call stack size error
let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    window.ModalManager = new ModalManager();

    //Threejs Elements
    this.canvas = document.querySelector('canvas.threejs');
    this.scene = new THREE.Scene();

    //add debug GUI
    this.gui = new GUI();

    //Asset Loader
    this.assetLoader = new AssetLoader();

    //Asset Loader
    this.preloader = new Preloader();
    this.inputController = new InputController();

    //Camera & Renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    //World
    this.world = new World();

    //Load Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      '/textures/2k_stars_milky_way.jpg'
    );
    this.scene.background = texture;

    //Extra Utils
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
