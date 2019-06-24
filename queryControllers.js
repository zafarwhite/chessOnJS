let canMoveColor = 'white';

export function move() {
  canMoveColor = canMoveColor === 'white' ? 'black' : 'white';
  return canMoveColor;
}

export function isCanMove(color) {
  return canMoveColor === color;
}