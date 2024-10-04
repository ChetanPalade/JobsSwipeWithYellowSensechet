import React, { useState, useEffect } from 'react';
import JobList from './components/jobList/JobList';
import './App.css';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the default prompt from appearing
      e.preventDefault();
      setDeferredPrompt(e);  // Save the event to trigger it later
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();  // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);  // Clear the deferred prompt
      });
    }
  };

  return (
    <div className="App">
      <h1 className='Heading'>Jobs Finder </h1>
      <p className='details'>Jobs on swipe</p>
      
      <div className='items'><JobList />
      {deferredPrompt && (
        <button onClick={handleInstallClick}>Install App</button>
      )}
  
      </div>
    </div>
  );
}

export default App;
