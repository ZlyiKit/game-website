import React from 'react';
import './Rules.css';

function Rules() {
  return (
    <div className="rules-container">
      <h2 className="rules-title">📜 Game Rules</h2>
      <p className="rules-text">
        Swipe with your keyboard or click the arrow buttons to move the tiles.
        Tiles with the same number combine when they touch.
        Keep combining them until you reach <strong>2048</strong> to win!
      </p>
      <div className="cat-image-wrapper">
        <img
          src={`${process.env.PUBLIC_URL}/images/rules_cat.gif`}
          alt="Helpful cartoon cat"
          className="rules-cat"
        />
      </div>
    </div>
  );
}

export default Rules;
