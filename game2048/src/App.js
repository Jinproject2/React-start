import React, { useState, useEffect } from 'react';
import AboveGame from './component/AboveGame';
import Game from './component/Game';
import Header from './component/Header';
import useLocalStorageNumber from './hook/useLocalStorage';

export default function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber('bestScore', 0);

  useEffect(() => {
    if(score > bestScore) {
      setBestScore(score);
    }
  })

  return  <div className="container">
    <Header score={score} bestScore={bestScore} />
    <AboveGame />
    <Game setScore={setScore} />
  </div>;
}