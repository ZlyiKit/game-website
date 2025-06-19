import React, { useRef } from 'react';
import Tile from './Tile';

function GameBoard({ grid, onMove }) {
  const boardRef = useRef(null);

  const handleClick = (event) => {
    const rect = boardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = x - centerX;
    const dy = y - centerY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        onMove('right');
      } else {
        onMove('left');
      }
    } else {
      if (dy > 0) {
        onMove('down');
      } else {
        onMove('up');
      }
    }
  };

  return (
    <div className="board" ref={boardRef} onClick={handleClick}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Tile key={colIndex} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
