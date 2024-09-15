// src/App.js

import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css'; // Import your Tailwind CSS styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <Dashboard toggleDarkMode={() => setDarkMode(!darkMode)} />
    </div>
  );
}

export default App;
