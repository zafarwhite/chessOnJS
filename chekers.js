/**
 * check what figure is King
*/
export function isKing(element) {
	return element.dataset.figure === 'king';
  }
  
  /**
   * check what figures have same color
  */
  export function isSameColor(element1, element2) {
	return element1.dataset.color === element2.dataset.color;
  }
  
  export function isMoveAllowed({ figure, color, from, to }) {
	switch (figure) {
	  case 'pawn': return isPawnCanMove(color, from, to);
	}
  }
  /**
   * from: { x: number, y: number}
   * to:   { x: number, y: number}
   */
  function isPawnCanMove(color, from, to) {
	if (from.x !== to.x) {
	  return false
	}
  
	return true;
  }
  