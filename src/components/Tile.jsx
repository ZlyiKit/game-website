import React from 'react';

function Tile({ value }) {
  const className = `tile tile-${value}`;
  return (
    <div className={className}>
      {value !== 0 ? value : ''}
    </div>
  );
}

export default Tile;
