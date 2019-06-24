import './style.css';

import { isKing, isSameColor, isMoveAllowed } from './checkers';
import { isCanMove, move } from './queryController';

const figures = document.querySelector('.figure');
function handleDragStart(e) {
  e.dataTransfer.setData('content', e.target.id);
  return false;
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }


  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  const data = e.dataTransfer.getData('content');
  const oldElement = this.children[0];
  const newElement = document.getElementById(data);

  if (isCanMove(newElement.dataset.color)) {
    if (oldElement && isKing(oldElement)) {
      return false;
    }

    const from = getPosition(newElement.parentElement);
    const to = getPosition(this);

    const figureData = {
      ...newElement.dataset,
      from,
      to
    };

    if ((oldElement && !isSameColor(oldElement, newElement) || !oldElement) && isMoveAllowed(figureData)) {
      setFigure(newElement, this);
      move();
    }

  }

  this.classList.remove('over');
}

const cells = document.getElementsByTagName('td');
[].forEach.call(cells, function(col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false);
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
});


function setFigure(element, container) {
  const oldElement = container.children[0];

  if (oldElement) {
    oldElement.remove();
  }

  container.appendChild(element);
}

function getPosition(cell) {
  const row = cell.parentElement;
  const table = row.parentElement;
  const cells = Array.prototype.slice.call(row.children);
  const rows = Array.prototype.slice.call(table.children);

  return {
    x: cells.indexOf(cell) + 1,
    y: 8 - rows.indexOf(row)
  }
}
