import React from "react";
import "./Header.css";

function Header({ score, targetScore, resetGame }) {
  return (
    <div className="header-container">
      <div className="score-section">
        <div className="score-box">
          <div className="score-label">Score</div>
          <div className="score-value">{score}</div>
          <div className="target-label">🎯 Get {targetScore} to win!</div>
        </div>

        <button
          className="new-game-btn"
          onClick={(e) => {
            e.currentTarget.blur(); // 👈 remove focus after click
            resetGame();
          }}
        >
          New Game
        </button>
      </div>
    </div>
  );
}

export default Header;
