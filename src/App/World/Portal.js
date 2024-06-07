import * as THREE from 'three';
import App from '../App';
import ModalManager from '../UI/ModalManager';

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.modalManager = new ModalManager();

    this.portalNearMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });
    this.portalFarMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    this.portalMesh.material = this.portalFarMaterial;

    this.prevIsNear = false;
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
      const portalPosition = new THREE.Vector3();
      this.portalMesh.getWorldPosition(portalPosition);
      const distance = this.character.position.distanceTo(portalPosition);
      // console.log(distance);
      const isNear = distance < 7;
      if (isNear) {
        if (!this.prevIsNear) {
          this.portalMesh.material = this.portalNearMaterial;

          this.modalManager.openModal(
            this.modalInfo.title,
            this.modalInfo.description
          );
        }
        this.prevIsNear = true;
      } else {
        if (this.prevIsNear) {
          this.modalManager.closeModal();
          this.portalMesh.material = this.portalFarMaterial;
        }
        this.prevIsNear = false;
      }
    }
  }
}
