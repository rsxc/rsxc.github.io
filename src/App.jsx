import React, { useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';
import * as THREE from 'three';
import BIRDS from 'vanta/dist/vanta.birds.min';

function App() {
  const darkMode = useDarkMode(true);

  const router = createHashRouter([
    {
      path: "/*",
      element: <MainApp />,
    }
  ]);

  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    vantaEffect.current = BIRDS({
      el: vantaRef.current,
      three: THREE,
    });

    // Cleanup function for componentWillUnmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App" ref={vantaRef}>
            <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
