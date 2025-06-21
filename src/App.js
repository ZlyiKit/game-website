import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import ArrowControls from "./components/ArrowControls";
import WelcomePage from "./components/WelcomePage";
import NavBar from "./components/NavBar";
import GameOverModal from "./components/GameOverModal";
import WinModal from "./components/WinModal";
import Rules from "./components/Rules";
import About from "./components/About";
import Footer from "./components/Footer";

import {
  initializeGrid,
  move,
  addRandomTile,
} from "./utils/gameLogic";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [gridSize, setGridSize] = useState(null);
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [targetScore, setTargetScore] = useState(5000);

  const startNewGame = (selectedGridSize, selectedTargetScore) => {
    setGridSize(selectedGridSize);
    const initialGrid = initializeGrid(selectedGridSize);
    setGrid(initialGrid);
    setScore(0);
    setTargetScore(Number(selectedTargetScore)); // ensure it's a number
    setGameOver(false);
    setGameWon(false);
    setHasGameStarted(true);
    setScreen("game");
  };

  const handleMove = useCallback(
    (direction) => {
      if (gameOver || !direction || gameWon) return;

      setGrid((currentGrid) => {
        const { newGrid, gainedScore, moved } = move(currentGrid, direction);
        if (!moved) return currentGrid;

        const updatedScore = score + gainedScore;
        setScore(updatedScore);

        if (updatedScore >= targetScore) {
          setGameWon(true);
        }

        const updatedGrid = addRandomTile(newGrid);
        if (isGameOver(updatedGrid)) {
          setGameOver(true);
        }

        return updatedGrid;
      });
    },
    [gameOver, gameWon, score, targetScore]
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
      setGameWon(false);
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
          <Header
            score={score}
            resetGame={resetGame}
            targetScore={targetScore}
          />

          <div className="game-container">
            <GameBoard grid={grid} onMove={handleMove} />
            <ArrowControls onMove={handleMove} />
          </div>
          {gameOver && (
            <GameOverModal
              onRestart={resetGame}
              onGoHome={() => setScreen("welcome")}
            />
          )}

          {gameWon && (
            <WinModal
              onRestart={resetGame}
              onGoHome={() => setScreen("welcome")}
            />
          )}
        </>
      )}

      {screen === "about" && <About />}
      {screen === "rules" && <Rules />}
      <Footer />
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
