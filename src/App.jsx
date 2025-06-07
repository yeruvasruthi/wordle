import { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import confetti from "canvas-confetti";
import GameBoard from "./components/GameBoard";
import Notification from "./components/Notification";
import "./App.css";

function App() {
  const [words, setWords] = useState([]);
  const [wordOfTheDay, setWordOfTheDay] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState("");         // Store hint
  const [hintVisible, setHintVisible] = useState(false);  // Show hint only after click
  const [hintUnlocked, setHintUnlocked] = useState(false);  // Allow to click after first wrong guess
  const [notification, setNotification] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem("wordleStats");
    return savedStats ? JSON.parse(savedStats) : { wins: 0, losses: 0 };
  });

  useEffect(() => {
    Papa.parse("/5_letter_words.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const wordList = result.data
          .map(row => row.word?.toLowerCase())
          .filter(word => word && word.length === 5);

        if (wordList.length > 0) {
          setWords(wordList);
          const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
          setWordOfTheDay(randomWord);
        }
      },
      error: (err) => {
        console.error("Failed to load CSV", err);
      }
    });
  }, []);

  useEffect(() => {
    if (wordOfTheDay) {
      fetchHint(wordOfTheDay);
    }
  }, [wordOfTheDay]);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const fetchHint = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const definitions = response.data[0].meanings.flatMap(m => m.definitions);

      if (definitions.length > 0) {
        setHint(definitions[0].definition);
      } else {
        setHint(`The word starts with '${word[0].toUpperCase()}' and ends with '${word[word.length - 1].toUpperCase()}'.`);
      }
    } catch (error) {
      console.error("Failed to fetch hint", error);
      setHint(`The word starts with '${word[0].toUpperCase()}' and ends with '${word[word.length - 1].toUpperCase()}'.`);
    }
  };

  const getFeedback = (guess) => {
    return guess.split("").map((letter, idx) => {
      if (letter === wordOfTheDay[idx]) return "correct";
      else if (wordOfTheDay.includes(letter)) return "present";
      else return "absent";
    });
  };

  const handleKeyDown = (e) => {
    if (gameOver || !wordOfTheDay) return;

    if (e.key === "Enter" && currentGuess.length === 5) {
      if (!words.includes(currentGuess)) {
        setNotification("❌ Invalid word! Not in word list.");
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess.toLowerCase() === wordOfTheDay) {
        setGameOver(true);
        setNotification("🎉 Correct! You found the word!");
        confetti();
        updateStats('wins');
      } else if (newGuesses.length >= 5) {
        setGameOver(true);
        setNotification(`😢 Game Over! The word was "${wordOfTheDay.toUpperCase()}"`);
        updateStats('losses');
      } else {
        setNotification("❌ Wrong Guess. Try again!");
        if (!hintUnlocked) {
          setHintUnlocked(true); // Unlock hint after first wrong guess
        }
      }
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + e.key.toLowerCase());
    }
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  const handleNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWordOfTheDay(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setHintUnlocked(false);
    setHintVisible(false);
    setHint(""); // Reset hint
  };

  const updateStats = (result) => {
    const newStats = { ...stats };
    if (result === 'wins') {
      newStats.wins += 1;
    } else {
      newStats.losses += 1;
    }
    setStats(newStats);
    localStorage.setItem("wordleStats", JSON.stringify(newStats));
  };

  return (
    <div className="app" onKeyDown={handleKeyDown} tabIndex="0">
      <h1>WORDLE</h1>
      <div className="scoreboard">
        Wins: {stats.wins} | Losses: {stats.losses}
      </div>

      {/* Hint Button */}
      {hintUnlocked && (
        <button className="hint-btn" onClick={() => setHintVisible(true)}>
          Show Hint
        </button>
      )}

      {/* Hint Display */}
      {hintVisible && hint && (
        <div className="hint-box">
          <strong>Hint:</strong> {hint}
        </div>
      )}

      <GameBoard guesses={guesses} currentGuess={currentGuess} getFeedback={getFeedback} />

      {notification && (
        <Notification message={notification} onClose={handleCloseNotification} />
      )}

      <div className="button-group">
        {gameOver && (
          <button onClick={handleNewGame} className="new-game-btn">
            🎮 New Game
          </button>
        )}
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle">
          {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;
