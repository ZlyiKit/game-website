import React, { useState } from "react";
import "./WelcomePage.css";

const levels = [
  { name: "Beginner", target: 100 },
  { name: "Intermediate", target: 500 },
  { name: "Advanced", target: 2500 },
  { name: "Expert", target: 5000 },
];

function WelcomePage({ onStart }) {
  const [gridSize, setGridSize] = useState(4);
  const [level, setLevel] = useState(levels[0].target);

  return (
    <div className="welcome-container">
        <div className="welcome-content-wrapper">
      <h1 className="welcome-title">Welcome to Cozy 2048!</h1>

      <div className="welcome-panels">
        {/* Left container: Cat and message */}
        <div className="left-panel">
          <div className="cat-container" aria-label="Cheerful cartoon cat">
            <img
              src={`${process.env.PUBLIC_URL}/images/welcome_cat.png`}
              alt="Cheerful cartoon cat"
              className="cat-image"
            />
          </div>
          <p className="welcome-tagline">
            Puzzle, relax & have fun with our furry friend!
          </p>
        </div>

        {/* Right container: configuration */}
        <div className="right-panel">
          <div className="selector-group">
            <label htmlFor="grid-select" className="grid-label">
              Choose grid size:
            </label>
            <select
              id="grid-select"
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="grid-select"
              aria-label="Select grid size for the game"
            >
              <option value={4}>4 x 4</option>
              <option value={5}>5 x 5</option>
              <option value={6}>6 x 6</option>
            </select>
          </div>

          <div className="selector-group">
            <label htmlFor="level-select" className="grid-label">
              Choose level:
            </label>
            <select
              id="level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="grid-select"
              aria-label="Select game difficulty level"
            >
              {levels.map(({ name, target }) => (
                <option key={name} value={target}>
                  {name} (Target: {target.toLocaleString()} pts)
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn start-btn"
            onClick={() => onStart(gridSize, level)}
            aria-label="Start playing 2048"
          >
            Start Playing 2048
          </button>
        </div>
      </div>
      
    </div>
    </div>
  );
}

export default WelcomePage;
