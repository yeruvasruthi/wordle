import React from "react";
import "./GameBoard.css";

function GameBoard({ guesses, currentGuess, getFeedback }) {
  const rows = [...guesses];
  
  if (guesses.length < 5 && currentGuess) {
    rows.push(currentGuess); // Add the current typing row ONLY if not game over
  }

  const emptyRows = 5 - rows.length; // How many rows left to fill with empty boxes

  return (
    <div className="game-board">
      {rows.map((guess, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: 5 }).map((_, i) => {
            const letter = guess[i] || "";
            const feedback = (guess.length === 5 && rowIndex < guesses.length) ? getFeedback(guess)[i] : "";
            // Only give feedback for submitted guesses, not current typing

            return (
              <div key={i} className={`cell ${feedback}`}>
                {letter.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}

      {Array.from({ length: emptyRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="cell empty"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
