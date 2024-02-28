import React, { useState } from 'react';
import './App.css';

function App() {
  const [audioSource, setAudioSource] = useState("https://radio.canstream.co.uk:9037/live.mp3");
  const [playerKey, setPlayerKey] = useState(1);

  const handleRadio1Click = () => {
    setAudioSource("https://radio.canstream.co.uk:9037/live.mp3");
    setPlayerKey((prevKey) => prevKey + 1);
  };

  const handleRadio2Click = () => {
    setAudioSource("https://s42.myradiostream.com/:29400/listen.mp3?_=372338?nocache=1709122376");
    setPlayerKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Radio Player</h1>

        <audio controls key={playerKey}>
          <source src={audioSource} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>

        <div>
          <button onClick={handleRadio1Click}>Radio 1</button>
          <button onClick={handleRadio2Click}>Radio 2</button>
        </div>
      </header>
    </div>
  );
}

export default App;
