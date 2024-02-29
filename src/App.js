import React, { useState, useEffect } from 'react';
import './App.css';
import stations from './data/stations';

function App() {
  const [audioSource, setAudioSource] = useState("https://radio.canstream.co.uk:9037/live.mp3");
  const [stationTitle, setStationTitle] = useState("Ujima");
  const [playerKey, setPlayerKey] = useState(1);
  const [theme, setTheme] = useState('light');

  const handleRadioClick = (newSource, newTitle) => {
    setAudioSource(newSource);
    setPlayerKey((prevKey) => prevKey + 1);
    setStationTitle(newTitle);
    document.title = `${newTitle}`;
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Update localStorage
  };

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
      <header className="App-header">
        <h1>Radio Player📻</h1>
        <h2>{stationTitle}</h2>

        <audio controls key={playerKey} autoPlay>
          <source src={audioSource} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>

        <div>
          {stations.map(item => (
            <button key={item.name} onClick={() => handleRadioClick(item.source, item.name)}>
              {item.name}
            </button>
          ))}
        </div>

        <button onClick={handleThemeChange}>Toggle Theme</button>
      </header>
    </div>
  );
}

export default App;
