import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import AssetStore from './AssetStore';

export default class AssetLoader {
  constructor() {
    this.instantiateLoader();
    this.startLoading();
    this.assetStore = AssetStore;
    console.log('assetStore', this.assetStore);
  }

  instantiateLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {}
}
