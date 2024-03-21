import React, { useState, useEffect, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner.tsx";
import NavBarWithRouter from "./components/NavBar.tsx";
import Home from "./components/Home.tsx";
import endpoints from "./constants/endpoints.ts";
import Particles from "react-tsparticles";
import AppContext from "./AppContext.ts";
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "tsparticles";

function MainApp() {
	const [data, setData] = useState<any>(null);
	useEffect(() => {
		fetch(endpoints.routes, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((res) => setData(res))
			.catch((err) => err);
	}, []);

	const values = useContext(AppContext);

	return (
		<div className="MainApp">
			<Suspense fallback={<FallbackSpinner />}>
				<Particles
					options={
						values.darkMode.value === true
							? configs.amongUs as ISourceOptions
							: configs.emitterAngled as ISourceOptions
					}
				/>
			</Suspense>
			<NavBarWithRouter />
			<main className="main">
				<Suspense fallback={<FallbackSpinner />}>
					<Routes>
						<Route path="/" element={<Home />} />
						{data?.sections?.map((route) => {
							const SectionComponent = React.lazy(
								() => import(`./components/${route.component}.tsx`),
							);
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
