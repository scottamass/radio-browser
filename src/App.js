import React, { useState } from 'react';
import './App.css';

function App() {
  const [audioSource, setAudioSource] = useState("https://radio.canstream.co.uk:9037/live.mp3");
  const [stationTitle, setStationTitle] = useState("Ujima");
  const [playerKey, setPlayerKey] = useState(1);

  const handleRadioClick = (newSource, newTitle) => {
    setAudioSource(newSource);
    setPlayerKey((prevKey) => prevKey + 1);
    setStationTitle(newTitle);
    document.title = `${newTitle}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Radio Player</h1>
        <h2>{stationTitle}</h2>

        <audio controls key={playerKey} autoPlay>
          <source src={audioSource} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>

        <div>
          <button onClick={() => handleRadioClick("https://radio.canstream.co.uk:9037/live.mp3", "Ujima")}>Ujima 98</button>
          <button onClick={() => handleRadioClick("https://s42.myradiostream.com/:29400/listen.mp3", "Thornbury Radio")}>Thornbury Radio</button>
          <button onClick={() => handleRadioClick("https://ec3.yesstreaming.net:3755/stream", "Lofi Radio")}>Lofi Radio</button>
        </div>
      </header>
    </div>
  );
}

export default App;
