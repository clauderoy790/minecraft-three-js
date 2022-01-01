import {
  BufferAttribute,
  Euler,
  Mesh,
  PlaneBufferGeometry,
  Vector3,
} from 'three';
import { Game } from './game';

export class Cube {
  static dirt_grass: number[] = [0, 1, 0.5, 1, 0.5, 0, 0, 0];
  static grass: number[] = [0.5, 1, 1, 1, 1, 0, 0.5, 0];
  rot: Euler = new Euler();
  pos: Vector3 = new Vector3();
  meshes: Mesh[] = [];
  size: number = 1;

  get rotation(): Euler {
    return this.rot;
  }

  set rotation(eu: Euler) {
    console.log('set rot to: ', eu);

    this.rot = eu;
    // top
    this.meshes[0].rotation.x = (-Math.PI / 2) +eu.x;
    // bot
    this.meshes[1].rotation.x = (Math.PI / 2) +eu.x;
    // back
    this.meshes[2].rotation.y = Math.PI + eu.y;
    // front
    this.meshes[3].rotation.y = eu.y
    // left
    this.meshes[4].rotation.y = (-Math.PI / 2)+eu.y;
    // right
    this.meshes[5].rotation.y = (Math.PI / 2)+eu.y;
    // this.meshes.forEach((m) => {
    //   m.rotation.x = eu.x;
    //   m.rotation.y = eu.y;
    //   m.rotation.z = eu.z;
    // });
  }

  get position(): Vector3 {
    return this.pos;
  }

  set position(pos: Vector3) {
    console.log({ pos, meshes: this.meshes });

    this.pos = pos;
    console.log({ pos, topPos: this.meshes[0].position });

    // top
    this.meshes[0].position.set(
      this.pos.x,
      this.pos.y + this.size / 2,
      this.pos.z
    );
    // bot
    this.meshes[1].position.set(
      this.pos.x,
      this.pos.y - this.size / 2,
      this.pos.z
    );
    // back
    this.meshes[2].position.set(
      this.pos.x,
      this.pos.y,
      this.pos.z - this.size / 2
    );
    console.log('before: ');

    // front
    this.meshes[3].position.set(
      this.pos.x,
      this.pos.y,
      this.pos.z + this.size / 2
    );
    // left
    this.meshes[4].position.set(
      this.pos.x - this.size / 2,
      this.pos.y,
      this.pos.z
    );
    // right
    this.meshes[5].position.set(
      this.pos.x + this.size / 2,
      this.pos.y,
      this.pos.z
    );
  }

  constructor() {
    for (let i = 0; i < 6; i++) {
      const geometry = new PlaneBufferGeometry(this.size, this.size);
      const uvs = new Float32Array(i % 2 == 0 ? Cube.dirt_grass : Cube.grass);
      geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
      geometry.attributes.uv.needsUpdate = true;
      const m = new Mesh(geometry, Game.mat);
      Game.scene.add(m);
      this.meshes.push(m);
    }
    this.position = this.pos;
    this.rotation = this.rot;
  }

  update() {
    //this.rotation = new Euler(this.rotation.x+0.01,this.rotation.y+0.01,this.rotation.z)
  }
}
