import { BufferAttribute, Mesh, PlaneBufferGeometry, Vector3 } from 'three';
import { Game } from './game';
import { Vectors } from './vectors';

enum Face {
  Top = 0,
  Bot,
  Back,
  Front,
  Left,
  Right,
}

enum UV {
  Dirt = 0,
  Dirt_Grass,
  Grass,
}

export class Cube {
  static cubes: Map<string, Cube> = new Map<string, Cube>();
  static uvs: number[][] = [
    [0, 1, 1 / 3, 1, 1 / 3, 0, 0, 0], // Dirt
    [1 / 3, 1, 2 / 3, 1, 2 / 3, 0, 1 / 3, 0], // Dirt_Grass
    [2 / 3, 1, 1, 1, 1, 0, 2 / 3, 0], // Grass
  ];
  pos: Vector3 = new Vector3();
  meshes: Mesh[] = [];
  size: number = 1;

  get position(): Vector3 {
    return this.pos;
  }

  set position(pos: Vector3) {
    this.pos = pos;

    this.meshes[Face.Top].position.set(
      this.pos.x,
      this.pos.y + this.size / 2,
      this.pos.z
    );
    this.meshes[Face.Bot].position.set(
      this.pos.x,
      this.pos.y - this.size / 2,
      this.pos.z
    );
    this.meshes[Face.Back].position.set(
      this.pos.x,
      this.pos.y,
      this.pos.z - this.size / 2
    );
    this.meshes[Face.Front].position.set(
      this.pos.x,
      this.pos.y,
      this.pos.z + this.size / 2
    );
    this.meshes[Face.Left].position.set(
      this.pos.x - this.size / 2,
      this.pos.y,
      this.pos.z
    );
    this.meshes[Face.Right].position.set(
      this.pos.x + this.size / 2,
      this.pos.y,
      this.pos.z
    );
  }

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    for (let i = 0; i < 6; i++) {
      const geometry = new PlaneBufferGeometry(this.size, this.size);
      let uvs: Float32Array;
      switch (i) {
        case Face.Top: {
          uvs = new Float32Array(Cube.uvs[UV.Grass]);
          break;
        }
        case Face.Bot: {
          uvs = new Float32Array(Cube.uvs[UV.Dirt]);
          break;
        }
        default: {
          uvs = new Float32Array(Cube.uvs[UV.Dirt_Grass]);
          break;
        }
      }
      geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
      geometry.attributes.uv.needsUpdate = true;
      const m = new Mesh(geometry, Game.mat);
      Game.scene.add(m);
      this.meshes.push(m);
    }
    this.setRotation();
    this.position = new Vector3(x, y, z);

    if (Cube.cubes.get(JSON.stringify(this.position))) {
      console.error('there is already a cube at position: ', this.position);
      return;
    }

    Cube.cubes.set(JSON.stringify(this.position), this);
    if (this.cubeOver()) {
      this.changeSideToDirt();
    } else if (this.cubeUnder()) {
      const under = this.cubeUnder();
      under.changeSideToDirt();
    }
  }

  cubeOver(): Cube {
    return Cube.cubes.get(
      JSON.stringify(
        new Vector3(this.position.x, this.position.y + 1, this.position.z)
      )
    );
  }

  cubeUnder(): Cube {
    return Cube.cubes.get(
      JSON.stringify(
        new Vector3(this.position.x, this.position.y - 1, this.position.z)
      )
    );
  }

  setRotation() {
    this.meshes[Face.Top].rotation.x = -Math.PI / 2;
    this.meshes[Face.Bot].rotation.x = Math.PI / 2;
    this.meshes[Face.Back].rotation.y = Math.PI;
    this.meshes[Face.Left].rotation.y = -Math.PI / 2;
    this.meshes[Face.Right].rotation.y = Math.PI / 2;
  }

  changeSideToDirt() {
    this.meshes.forEach((m, i) => {
      if (![Face.Top, Face.Bot].includes(i)) {
        const uvs = new Float32Array(Cube.uvs[UV.Dirt]);
        m.geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
        m.geometry.attributes.uv.needsUpdate = true;
      }
    });
  }

  update() {
    //this.rotation = new Euler(this.rotation.x+0.01,this.rotation.y+0.01,this.rotation.z)
  }
}
