import React from 'react';
import './NavBar.css';

function NavBar({ onShowWelcome, onShowAbout, onShowRules, onShowGame, hasGameStarted }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={onShowWelcome}>Cozy 2048</div>
      <div className="nav-links">
        <button onClick={onShowWelcome}>Home</button>
        {hasGameStarted && <button onClick={onShowGame}>Current Game</button>}
        <button onClick={onShowRules}>Rules</button>
        <button onClick={onShowAbout}>About Us</button>
      </div>
    </nav>
  );
}

export default NavBar;

