import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';

const App = () => {
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const maxCount = 10;

  useEffect(() => {
    if (count === maxCount) {
      setMessage('You have reached the maximum number of guesses!');
    }
  }, [count]);

  const remainingAttempts = maxCount - count;

  const handleGuess = (value) => {
    const guessNum = parseInt(value);
    setCount(count + 1);
    if (!gameWon && count < maxCount) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        setGameWon(true);
      } else if (guessNum < secretNumber) {
        setMessage(`You Guessed Too low. Try again!`);
      } else if (guessNum > secretNumber) {
        setMessage(`You Guessed Too High. Try again!`);
      }
    }
  };

  const resetGame = () => {
    setSecretNumber(generateSecretNumber());
    setMessage('');
    setCount(0);
    setGameWon(false);
  };

  const resetButton = (
    <Button onClick={resetGame} text="Reset Game" />
  );

  function generateSecretNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  return (
    <>
      <Header />
      <div className={`container ${gameWon ? 'won' : ''}`}>
        <div className="card">
          <div className="content">
            <NumberInput onSubmit={handleGuess} />
            <ResultMessage message={message} />
            {count === maxCount && resetButton}
          </div>
          <div className="attempts">
            <p>Remaining attempts: {remainingAttempts}</p>
            {resetButton}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
