import * as THREE from 'three';
import App from '../App';
import ModalManager from '../UI/ModalManager';

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.modalManager = new ModalManager();
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
      const portalPosition = new THREE.Vector3();
      this.portalMesh.getWorldPosition(portalPosition);
      const distance = this.character.position.distanceTo(portalPosition);
      // console.log(distance);
      const isNear = distance < 6;
      if (isNear) {
        this.modalManager.openModal(
          this.modalInfo.title,
          this.modalInfo.description
        );
      }
    }
  }
}
