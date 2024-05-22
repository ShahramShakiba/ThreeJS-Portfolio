import { inputStore } from '../Utils/Store';

export default class InputController {
  constructor() {
    this.startListening();
    this.inputStore = inputStore;
  }

  startListening() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'KeyW':
        this.inputStore.setState({ forward: true });
        break;

      case 'KeyA':
        this.inputStore.setState({ left: true });
        break;

      case 'KeyS':
        this.inputStore.setState({ backward: true });
        break;

      case 'KeyD':
        this.inputStore.setState({ right: true });
        break;
    }
  }
  onKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
        this.inputStore.setState({ forward: false });
        break;

      case 'KeyA':
        this.inputStore.setState({ left: false });
        break;

      case 'KeyS':
        this.inputStore.setState({ backward: false });
        break;

      case 'KeyD':
        this.inputStore.setState({ right: false });
        break;
    }
  }
}
