import React from 'react';
import './Header.css';

function Header({ score, resetGame }) {
  return (
    <div className="header-container">


      <div className="score-section">
        <div className="score-box">
          <div className="score-label">Score</div>
          <div className="score-value">{score}</div>
        </div>

        <button className="new-game-btn" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default Header;
