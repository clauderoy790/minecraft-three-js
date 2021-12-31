import { PerspectiveCamera, Vector3 } from 'three';
import { Time } from './time';
export class Player {
  speed = 4;
  direction: Vector3;
  cam: PerspectiveCamera;
  constructor(cam: PerspectiveCamera) {
    this.direction = new Vector3();
    this.cam = cam;
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    console.log('direction: ', this.direction);
  }

  onKeyDown(event: any) {
    switch (event.key) {
      case 'w': {
        this.direction.z = -1;
        break;
      }
      case 'a': {
        this.direction.x = -1;
        break;
      }
      case 's': {
        this.direction.z = 1;
        break;
      }
      case 'd': {
        this.direction.x = 1;
        break;
      }
    }
  }

  onKeyUp(event: any) {
    switch (event.key) {
      case 'w':
      case 's': {
        this.direction.z = 0;
        break;
      }
      case 'a':
      case 'd': {
        this.direction.x = 0;
        break;
      }
    }
  }

  update() {
    this.cam.position.add(this.direction.multiplyScalar(Time.deltaTime()));
  }
}
