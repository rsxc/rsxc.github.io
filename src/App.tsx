import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext.ts';
import MainApp from './MainApp.tsx';
import GlobalStyles from './theme/GlobalStyles.ts';
import { lightTheme, darkTheme } from './theme/themes.ts';

function App() {
  (window as any).global = window;
  const darkMode = useDarkMode(true);

  const router = createHashRouter([
    {
      path: "/*",
      element: <MainApp />,
    }
  ]);

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
