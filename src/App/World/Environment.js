import * as THREE from 'three';
import App from '../App.js';
import Portal from './Portal.js';
import assetStore from '../Utils/AssetStore.js';
import ModalContentProvider from '../UI/ModalContentProvider.js';

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
    this.addPortals();
    this.addGround();
  }

  loadEnvironment() {
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    environmentScene.position.set(-20.2, 0, -23.5);
    environmentScene.rotation.set(0, -0.32, 0);
    environmentScene.scale.setScalar(2.5);

    // objects that can cast shadows
    const physicalObjects = [
      'trees',
      'terrain',
      'rocks',
      'stairs',
      'gates',
      'floor',
      'bushes',
    ];
    const shadowCasters = [
      'trees',
      'terrain',
      'rocks',
      'stairs',
      'gates',
      'bushes',
    ];
    const shadowReceivers = ['terrain', 'floor'];

    for (const child of environmentScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) =>
            child.name.includes(keyword)
          );
          obj.receiveShadow = shadowReceivers.some((keyword) =>
            child.name.includes(keyword)
          );

          if (physicalObjects.some((keyword) => child.name.includes(keyword))) {
            this.physics.add(obj, 'fixed', 'cuboid');
          }
        }
      });
    }
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directionalLight.position.set(20, 38, 22);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 60;
    this.directionalLight.shadow.camera.right = 60;
    this.directionalLight.shadow.camera.left = -60;
    this.directionalLight.shadow.camera.bottom = -60;
    this.directionalLight.shadow.bias = -0.004;
    this.directionalLight.shadow.normalBias = 0.72;
    this.scene.add(this.directionalLight);
  }

  addGround() {
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load(
      '/textures/wispy-grass-meadow_albedo.png'
    );

    // Adjust texture repeat and wrap mode
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: groundTexture,
    });
    const groundGeometry = new THREE.PlaneGeometry(5000, 5000);

    // Create ground mesh
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);
    this.physics.add(groundMesh, 'fixed', 'cuboid');
  }

  addPortals() {
    const portalMesh1 = this.environment.scene.getObjectByName('portals');
    const portalMesh2 = this.environment.scene.getObjectByName('portals002');
    const portalMesh3 = this.environment.scene.getObjectByName('portals001');
    const modalContentProvider = new ModalContentProvider();

    this.portal1 = new Portal(
      portalMesh1,
      modalContentProvider.getModalInfo('aboutMe')
    );
    this.portal2 = new Portal(
      portalMesh2,
      modalContentProvider.getModalInfo('projects')
    );
    this.portal3 = new Portal(
      portalMesh3,
      modalContentProvider.getModalInfo('contactMe')
    );
  }

  loop() {
    this.portal1.loop();
    this.portal2.loop();
    this.portal3.loop();
  }
}
