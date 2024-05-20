import App from '../App';

export default class Loop {
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.loop();
  }

  loop() {
    this.camera.loop();
    this.renderer.loop();
    window.requestAnimationFrame(() => this.loop());
  }
}
