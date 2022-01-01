import { PerspectiveCamera, Raycaster, Vector3 } from 'three';
import { Time } from './time';
import { Vectors } from './vectors';
export class Player {
  runSpeed = 4;
  flySpeed = 4;
  rotateSpeed = 0.5;
  forward = new Vector3();
  right = new Vector3();
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
    this.calculateRotation();
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
        this.cam.rotateY(Time.deltaTime() * this.rotateSpeed);
        break;
      }
      case event.clientX > innerWidth - val: {
        this.cam.rotateY(Time.deltaTime() * -this.rotateSpeed);
        break;
      }
      case event.clientY < val: {
        this.cam.rotateX(Time.deltaTime() * this.rotateSpeed);
        break;
      }
      case event.clientY > innerHeight - val: {
        this.cam.rotateX(Time.deltaTime() * -this.rotateSpeed);
        break;
      }
    }
    this.calculateRotation();
  }

  calculateRotation() {
    this.cam.getWorldDirection(this.forward);
    this.forward = this.forward.normalize();
    console.log('forward:', this.forward);

    this.right = this.forward.applyAxisAngle(Vectors.up, Math.PI / 2);
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'w': {
        this.direction.z = -this.runSpeed;
        break;
      }
      case 'a': {
        this.direction.x = -this.runSpeed;
        break;
      }
      case 's': {
        this.direction.z = this.runSpeed;
        break;
      }
      case 'd': {
        this.direction.x = this.runSpeed;
        break;
      }
      case ' ': {
        this.direction.y = this.flySpeed;
        break;
      }
      case 'v': {
        this.direction.y = -this.flySpeed;
        break;
      }
      case 'r': {
        this.cam.rotation.set(0, 0, 0);
        this.cam.position.set(0, 0, 5);
        this.calculateRotation();
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
    switch (true) {
      case this.direction.x != 0: {
        this.cam.translateX(this.direction.x * Time.deltaTime());
        break;
      }
      case this.direction.y != 0: {
        this.cam.translateOnAxis(
          Vectors.up,
          this.direction.y * Time.deltaTime()
        );
        break;
      }
      case this.direction.z != 0: {
        this.cam.translateZ(this.direction.z * Time.deltaTime());
        break;
      }
    }
  }
}
