import * as THREE from 'three';
import App from '../App.js';
import assetStore from '../Utils/AssetStore.js';

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.pane = this.app.gui.pane;

    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;

    this.loadEnvironment();
    this.addLights();
    // this.addGround();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    this.pane.addBinding(environmentScene, 'position', {
      min: -100,
      max: 100,
      step: 0.1,
    });

    this.pane.addBinding(environmentScene, 'rotation', {
      min: -Math.PI,
      max: Math.PI,
      step: 0.01,
    });

    const scale = { value: 1 };
    this.pane
      .addBinding(scale, 'value', {
        min: 0,
        max: 5,
        step: 0.01,
      })
      .on('change', (scale) => {
        environmentScene.scale.setScalar(scale.value);
      });

    environmentScene.position.set(-20.2, 0, -23.5);
    environmentScene.rotation.set(0, -0.32, 0);
    environmentScene.scale.setScalar(2.5);

    environmentScene.traverse((obj) => {
      if (obj.isMesh) {
        this.physics.add(obj, 'fixed', 'cuboid');
      }
    });
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }

  // addGround() {
  //   const gG = new THREE.BoxGeometry(100, 1, 100);
  //   const gM = new THREE.MeshStandardMaterial({ color: 'green' });

  //   this.gMesh = new THREE.Mesh(gG, gM);
  //   this.scene.add(this.gMesh);
  //   this.physics.add(this.gMesh, 'fixed', 'cuboid');
  // }
}
