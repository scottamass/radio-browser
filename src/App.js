import React, { useState, useEffect } from 'react';
import './App.css';
import stations from './data/stations';
import Stationcard from './comps/Stationcard';


function App() {
  const storedTheme = window.localStorage.getItem('theme') || 'light';
  const storedStation = window.localStorage.getItem('current-station') || 'Ujima';
  const storedPlayerKey = parseInt(window.localStorage.getItem('playerKey')) || 1;
  const storedUrl = window.localStorage.getItem('audioSource') || 'https://radio.canstream.co.uk:9037/live.mp3'

  const [audioSource, setAudioSource] = useState(storedUrl);
  const [stationTitle, setStationTitle] = useState(storedStation);
  const [playerKey, setPlayerKey] = useState(storedPlayerKey);
  const [theme, setTheme] = useState(storedTheme);

  const handleRadioClick = (newSource, newTitle) => {
    setAudioSource(newSource);
    setPlayerKey((prevKey) => prevKey + 1);
    setStationTitle(newTitle);
    document.title = `${newTitle}`;
    
    // Store selected station in localStorage
    localStorage.setItem('current-station', newTitle);
    localStorage.setItem('playerKey', playerKey);
    localStorage.setItem('audioSource', newSource);
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // Restore selected station and audio source from localStorage
    const storedStation = window.localStorage.getItem('current-station') || 'Ujima';
    const storedAudioSource = window.localStorage.getItem('audioSource') || "https://radio.canstream.co.uk:9037/live.mp3";

    setStationTitle(storedStation);
    setAudioSource(storedAudioSource);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        setTheme('dark');
      }
    }
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <button onClick={handleThemeChange}>Toggle Theme</button>
      <header className="App-header">
        <h1>Radio Player 📻</h1>
        <h2>{stationTitle}</h2>

        <audio controls key={playerKey} autoPlay>
          <source src={audioSource} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>

        <div>
          {stations.map(item => (
            <>
            <Stationcard onClick={() => handleRadioClick(item.source, item.name)} name={item.name}/>
           
            {/* <button key={item.name} onClick={() => handleRadioClick(item.source, item.name)}>
              {item.name}
            </button> */}
            
            </>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
