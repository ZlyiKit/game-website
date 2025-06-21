import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">🐾 About Us</h2>
      <p className="about-text">
        Cozy 2048 is a simple clone of the classic 2048 puzzle game,
        built using <strong>React</strong> as part of a course portfolio for <strong>SEG3125</strong>.
      </p>
      <p className="about-text">
        We're students passionate about web development and user-friendly design —
        and of course, we love cats! 🐱
      </p>
    </div>
  );
}

export default About;
