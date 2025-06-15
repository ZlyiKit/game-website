// components/ArrowControls.js
import React from 'react';
import './ArrowControls.css'; // Create new CSS file for this

function ArrowControls({ onMove }) {
  return (
    <div className="arrow-controls">
      <div className="arrow-row">
        <button className="arrow-btn" onClick={() => onMove('up')} aria-label="Move Up">▲</button>
      </div>
      <div className="arrow-row">
        <button className="arrow-btn" onClick={() => onMove('left')} aria-label="Move Left">◀</button>
        <button className="arrow-btn" onClick={() => onMove('down')} aria-label="Move Down">▼</button>
        <button className="arrow-btn" onClick={() => onMove('right')} aria-label="Move Right">▶</button>
      </div>
    </div>
  );
}

export default ArrowControls;
