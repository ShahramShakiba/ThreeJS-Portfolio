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

    //^^^^^^ Threejs Elements
    this.canvas = document.querySelector('canvas.threejs');
    this.scene = new THREE.Scene();

    // add debug GUI
    this.gui = new GUI();

    //^^^^^^ Asset Loader
    this.assetLoader = new AssetLoader();

    //^^^^^^ Asset Loader
    this.preloader = new Preloader();
    this.inputController = new InputController();

    //^^^^^^ Camera & Renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    //^^^^^^ World
    this.world = new World();

    // Load Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/textures/8k_stars_milky_way.jpg');

    // Apply Texture to Scene Background
    this.scene.background = texture;

    //^^^^^^ Add Background Music
    this.addBackgroundMusic();

    //^^^^^^ Extra Utils
    this.loop = new Loop();
    this.resize = new Resize();
  }

  addBackgroundMusic() {
    // Create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.camera.instance.add(listener);

    // Create a global audio source
    this.sound = new THREE.Audio(listener);

    // Load the sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('../Assets/music/Solar.mp3', (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.1);
    });

    // Add event listener for the mute button
    const muteButton = document.getElementById('muteButton');
    let isPlaying = false;
    muteButton.addEventListener('click', () => {
      if (isPlaying) {
        this.sound.pause();
        muteButton.textContent = 'Start';
      } else {
        this.sound.play();
        muteButton.textContent = 'Mute';
      }
      isPlaying = !isPlaying;
    });
  }
}
