// utils/gameLogic.js

export function initializeGrid(size = 4) {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
  return addRandomTile(addRandomTile(grid));
}

export function selectedLevel(level = 5000){
  return level;
}

export function move(grid, direction) {
  let transformedGrid = transformGrid(grid, direction);
  let { newGrid, gainedScore, moved } = slideAndMerge(transformedGrid);
  newGrid = reverseTransformGrid(newGrid, direction);

  return { newGrid, gainedScore, moved };
}

// Convert any direction to "left" move
function transformGrid(grid, direction) {
  switch (direction) {
    case 'up':
      return rotateLeft(grid);
    case 'down':
      return rotateRight(grid);
    case 'right':
      return flipRows(grid);
    case 'left':
    default:
      return grid;
  }
}

// Convert grid back to original orientation
function reverseTransformGrid(grid, direction) {
  switch (direction) {
    case 'up':
      return rotateRight(grid);
    case 'down':
      return rotateLeft(grid);
    case 'right':
      return flipRows(grid);
    case 'left':
    default:
      return grid;
  }
}

// Merge + compress logic (fully dynamic size)
function slideAndMerge(grid) {
  let gainedScore = 0;
  let moved = false;

  const size = grid[0].length;  // <-- dynamic size

  const newGrid = grid.map(row => {
    let newRow = row.filter(val => val !== 0);

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        gainedScore += newRow[i];
        newRow[i + 1] = 0;
      }
    }

    newRow = newRow.filter(val => val !== 0);
    while (newRow.length < size) {
      newRow.push(0);
    }

    if (!arraysEqual(newRow, row)) {
      moved = true;
    }

    return newRow;
  });

  return { newGrid, gainedScore, moved };
}

// Helpers for rotation and flipping

function rotateLeft(grid) {
  const size = grid.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[size - j - 1][i] = grid[i][j];
    }
  }
  return rotated;
}

function rotateRight(grid) {
  const size = grid.length;
  const rotated = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - i - 1] = grid[i][j];
    }
  }
  return rotated;
}

function flipRows(grid) {
  return grid.map(row => [...row].reverse());
}

function arraysEqual(a, b) {
  return a.every((val, i) => val === b[i]);
}

// Add random tile
export function addRandomTile(grid) {
  const emptyCells = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) emptyCells.push({ row: rowIndex, col: colIndex });
    });
  });

  if (emptyCells.length === 0) return grid;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
}
