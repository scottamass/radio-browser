// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Stationcard from './comps/Stationcard';
import { fetchStations } from './lib/supabaseUtils';

function App() {
  const storedTheme = window.localStorage.getItem('theme') || 'light';
  const storedStation = window.localStorage.getItem('current-station') || 'Ujima';
  const storedAudioSource = window.localStorage.getItem('audioSource') || 'https://radio.canstream.co.uk:9037/live.mp3';
  const storedPlayerKey = parseInt(window.localStorage.getItem('playerKey')) || 1;

  const [audioSource, setAudioSource] = useState(storedAudioSource);
  const [stationTitle, setStationTitle] = useState(storedStation);
  const [playerKey, setPlayerKey] = useState(storedPlayerKey);
  const [theme, setTheme] = useState(storedTheme);
  const [stations, setStations] = useState([]);

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
    const storedAudioSource = window.localStorage.getItem('audioSource') || 'https://radio.canstream.co.uk:9037/live.mp3';

    setStationTitle(storedStation);
    setAudioSource(storedAudioSource);

    // Fetch stations from Supabase using the fetchStations function
    fetchStations()
      .then(data => {
        setStations(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching stations:', error.message);
      });
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
      </header>
      <body>
        <h2>{stationTitle}</h2>

        <audio controls key={playerKey} autoPlay>
          <source src={audioSource} type="audio/mpeg"></source>
          Your browser does not support the audio element.
        </audio>

        <div className='container'>
          {stations.map(item => (
            <>
            
            <Stationcard onClick={() => handleRadioClick(item.station_url, item.station_name)} name={item.station_name} key={item.station_name} />
</>          
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
