import React from "react";
import "./HintBox.css"; // <-- New CSS for better style

function HintBox({ hints, hintLevel }) {
  return (
    <div className="hint-container">
      {hints.slice(0, hintLevel).map((hint, index) => (
        <div key={index} className="hint-card">
          <strong>Hint {index + 1}:</strong> {hint}
        </div>
      ))}
    </div>
  );
}

export default HintBox;
