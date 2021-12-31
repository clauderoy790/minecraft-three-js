import { Clock } from 'three';

export module Time {
  const clock = new Clock();
  export function deltaTime(): number {
    return clock.getDelta();
  }
}
