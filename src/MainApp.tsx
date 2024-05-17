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
import PocketBase from 'pocketbase';
import Code from "./components/Code.tsx";
import Map from "./components/Map.tsx";

function MainApp() {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(endpoints.routes, {method: "GET"});
				const data = await res.json();
				setData(data);
				const geoRes = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=e5d74eb1d7cb452e87d3821101f5e810",
					{method: 'GET'}
				);
				const geoData = await geoRes.json();
				const logdata = {
					"VisitorIP": geoData?.ip || "test",
					"UserAgent": navigator.userAgent || "test",
					"ReferrerURL": window.frames.top.document.referrer || "test",
					"Browser": navigator.appName || "test",
					"OperatingSystem": navigator.platform || "test",
					"ScreenResolution": `${window.screen.width}x${window.screen.height}`,
					"Language": navigator.language || "test",
					"Country": geoData?.country?.name || "test",
					"City": geoData?.city?.name || "test",
					"Longitude": geoData?.location?.longitude || "test",
					"Latitude": geoData?.location?.latitude || "test",
					"PageVisited": location.href || "test"
				};
				const pb = new PocketBase('https://raghav.pockethost.io');
				pb.collection('visits').create(logdata);
			} catch (err) {
				console.log('error', err);
			}
		})();
	}, []);
	
	const values = useContext(AppContext);

	return (
		<div className="MainApp">
			<Suspense fallback={<FallbackSpinner />}>
				<Particles
					style={{zIndex: -1}}
					options={
						values.darkMode.value === true
							? configs.amongUs as unknown as ISourceOptions
							: configs.emitterAngled as unknown as ISourceOptions
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
						<Route path="/code" element={<Code />} />
						<Route path="/map" element={<Map />} />
					</Routes>
				</Suspense>
			</main>
		</div>
	);
}

export default MainApp;
