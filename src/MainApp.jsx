import React, { useState, useEffect, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import Particles from "react-tsparticles";
import graphicalOptions from "./theme/particles/graphical.json";
import snowOptions from "./theme/particles/snow"
import AppContext from './AppContext';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const values = useContext(AppContext);

  return (
    <div className="MainApp">
      <Particles options={values.darkMode.value == true ? snowOptions : graphicalOptions} />
      <NavBarWithRouter />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route exact="true" path="/" element={<Home />} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./components/' + route.component));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
