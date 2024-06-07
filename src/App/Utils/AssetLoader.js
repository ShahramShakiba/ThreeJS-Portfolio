import * as THREE from 'three';
import assetStore from './AssetStore';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default class AssetLoader {
  constructor() {
    this.assetStore = assetStore.getState();
    this.assetsToLoad = this.assetStore.assetsToLoad;
    this.addLoadedAsset = this.assetStore.addLoadedAsset;

    this.instantiateLoader();
    this.startLoading();
  }

  instantiateLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    this.assetsToLoad.forEach((asset) => {
      const assetPath = new URL(asset.path, import.meta.url).href; // Correctly resolve asset path
      if (asset.type === 'texture') {
        this.textureLoader.load(assetPath, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      }
      if (asset.type === 'model') {
        this.gltfLoader.load(assetPath, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      }
    });
  }
}
