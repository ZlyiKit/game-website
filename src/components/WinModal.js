import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import './WinModal.css';

function WinModal({ onRestart, onGoHome }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  // Optional: stop confetti after a few seconds
  useEffect(() => {
    const timeout = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="modal-window">
        <h2 className="modal-title">You Win! 🐱🎉</h2>
        <p className="modal-message">You reached your target! Great job!</p>
        <img src={`${process.env.PUBLIC_URL}/images/happy_cat.gif`} alt="Happy cat" className="modal-cat" />
        <div className="modal-buttons">
          <button className="btn" onClick={onRestart}>Play Again</button>
          <button className="btn" onClick={onGoHome}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

export default WinModal;
