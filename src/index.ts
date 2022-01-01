import Stats from 'three/examples/jsm/libs/stats.module';
import { Game } from './game';

const stats = Stats();
document.body.appendChild(stats.dom);
const game = new Game();

function animate() {
  requestAnimationFrame(animate);
  game.update();
  stats.update();
}

animate();
