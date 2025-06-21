// components/GameOverModal.js
import React from 'react';
import './GameOverModal.css';

function GameOverModal({ onRestart, onGoHome }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>😿 Game Over!</h2>
        <p>No more moves available.</p>
        <div className="modal-buttons">
          <button className="modal-btn" onClick={onRestart}>Restart Game</button>
          <button className="modal-btn" onClick={onGoHome}>Back to Welcome</button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
