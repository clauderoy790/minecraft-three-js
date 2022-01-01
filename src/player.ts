import { PerspectiveCamera, Raycaster, Vector3 } from 'three';
import { Time } from './time';
export class Player {
  speed = 4;
  rotateSpeed = 2;
  direction = new Vector3();
  cam: PerspectiveCamera;
  raycaster = new Raycaster();

  constructor() {
    this.cam = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 2000);
    this.cam.position.z = 5;
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('contextmenu', this.onContextMenu.bind(this));
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  onMouseDown(event: MouseEvent) {
    switch (event.button) {
      case 0: {
        // todo remove block
        break;
      }
      case 2: {
        // todo put block
        break;
      }
    }
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    const val = 200;
    switch (true) {
      case event.clientX < val: {
        this.cam.rotateOnWorldAxis(new Vector3(0,1,0),Time.deltaTime() * this.rotateSpeed)
        break;
      }
      case event.clientX > innerWidth - val: {
        this.cam.rotateOnWorldAxis(new Vector3(0,1,0),Time.deltaTime() * -this.rotateSpeed)
        break;
      }
      case event.clientY < val: {
        this.cam.rotateOnWorldAxis(new Vector3(1,0,0),Time.deltaTime() * this.rotateSpeed)
        break;
      }
      case event.clientY > innerHeight - val: {
        this.cam.rotateOnWorldAxis(new Vector3(1,0,0),Time.deltaTime() * -this.rotateSpeed)
        break;
      }
    }
  }

  onKeyDown(event: KeyboardEvent) {
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
      case ' ': {
        this.direction.y = 1;
        break;
      }
      case 'v': {
        this.direction.y = -1;
        break;
      }
      case 'r': {
        this.cam.rotation.set(0, 0, 0);
        this.cam.position.set(0, 0, 5);
        break;
      }
    }
  }

  onKeyUp(event: KeyboardEvent) {
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
      case 'v':
      case ' ': {
        this.direction.y = 0;
        break;
      }
    }
  }

  update() {
    this.cam.position.add(
      this.direction.multiplyScalar(Time.deltaTime()).multiplyScalar(this.speed)
    );
    this.raycaster;
  }
}
