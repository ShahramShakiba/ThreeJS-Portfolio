import * as THREE from 'three';
import App from '../App';

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.setCube();
    this.loop();
  }

  setCube() {
    this.cubMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    );

    this.scene.add(this.cubMesh);
  }
  loop() {
    this.cubMesh.rotation.y += 0.01;
  }
}
