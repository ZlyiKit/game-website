import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import ArrowControls from "./components/ArrowControls";
import WelcomePage from "./components/WelcomePage";
import NavBar from "./components/NavBar";
import { initializeGrid, move, addRandomTile, selectedLevel } from "./utils/gameLogic";

// Dummy About and Rules components for now:
const About = () => (
  <div className="page-content">
    <h2>About Us</h2>
    <p>This is a simple 2048 game clone made with React.</p>
  </div>
);

const Rules = () => (
  <div className="page-content">
    <h2>Rules</h2>
    <p>
      Swipe or click to combine tiles of the same number until you reach 2048!
    </p>
  </div>
);

function App() {
  const [screen, setScreen] = useState("welcome");
  const [gridSize, setGridSize] = useState(null);
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [targetScore, setTargetScore] = useState(5000);

  

  const startNewGame = (selectedGridSize, level) => {
    setGridSize(selectedGridSize);
    const initialGrid = initializeGrid(selectedGridSize);
    setGrid(initialGrid);
    setScore(0);
    setTargetScore(5000);
    setGameOver(false);
    setHasGameStarted(true);
    setScreen("game");
  };

  const handleMove = useCallback(
    (direction) => {
      if (gameOver || !direction) return;
      if (gameWon) return;

      setGrid((currentGrid) => {
        const { newGrid, gainedScore, moved } = move(currentGrid, direction);
        if (!moved) return currentGrid;

        const updatedGrid = addRandomTile(newGrid);
        setScore((prevScore) => prevScore + gainedScore);
        if (score >= targetScore){setGameWon(true);} // score doesn't change and stays at 0

        if (isGameOver(updatedGrid)) {
          setGameOver(true);
        }
        return updatedGrid;
      });
    },
    [gameOver || gameWon]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const direction = getDirection(event.key);
      handleMove(direction);
    },
    [handleMove]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const resetGame = () => {
    if (gridSize) {
      const initialGrid = initializeGrid(gridSize);
      setGrid(initialGrid);
      setScore(0);
      setGameOver(false);
    }
  };

  return (
    <div className="app">
      <NavBar
        onShowWelcome={() => setScreen("welcome")}
        onShowAbout={() => setScreen("about")}
        onShowRules={() => setScreen("rules")}
        onShowGame={() => setScreen("game")}
        hasGameStarted={hasGameStarted} 
      />

      {screen === "welcome" && <WelcomePage onStart={startNewGame} />}

      {screen === "game" && gridSize && (
        <>
          <Header score={score} resetGame={resetGame} />
          <GameBoard grid={grid} onMove={handleMove} />
          <ArrowControls onMove={handleMove} />
          {gameOver && <div className="game-over">Game Over</div>}
          {gameWon && <div className="win-message">You Win!</div>}

        </>
      )}

      {screen === "about" && <About />}
      {screen === "rules" && <Rules />}
    </div>
  );
}

function getDirection(key) {
  switch (key) {
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    default:
      return null;
  }
}

function isGameOver(board) {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        return false;
      }
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const current = board[row][col];

      if (col + 1 < size && board[row][col + 1] === current) return false;

      if (row + 1 < size && board[row + 1][col] === current) return false;
    }
  }

  return true;
}

export default App;
