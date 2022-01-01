import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  Scene,
  Texture,
  TextureLoader,
  WebGLRenderer,
} from 'three';
import { Cube } from './cube';
import { Player } from './player';
export class Game {
  static texture: Texture;
  static mat: MeshStandardMaterial;
  static scene: Scene;
  renderer: WebGLRenderer;
  player: Player;
  cubes: Cube[] = [];

  constructor() {
    Game.scene = new Scene();
    this.player = new Player();

    this.renderer = new WebGLRenderer();
    this.renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.addSkybox();
    const light = new AmbientLight();
    Game.scene.add(light);
    this.loadTexture();
    this.cubes.push(new Cube(1,0,0));
    this.cubes.push(new Cube());
    this.cubes.push(new Cube(0,1,0));
  }

  loadTexture() {
    Game.texture = new TextureLoader().load('assets/atlas.png');
    Game.texture.magFilter = NearestFilter;
    Game.mat = new MeshStandardMaterial({
      map: Game.texture,
      side: FrontSide,
      wireframe: false,
    });
  }

  addSkybox() {
    const box = new BoxGeometry(100, 100, 100);
    const skyMat = new MeshBasicMaterial({ color: 0x6f81aa, wireframe: false });
    skyMat.side = BackSide;
    const skybox = new Mesh(box, skyMat);
    Game.scene.add(skybox);
  }

  update() {
    this.renderer.render(Game.scene, this.player.cam);
    this.player.update();
    this.cubes.forEach((c) => c.update());
  }
}
