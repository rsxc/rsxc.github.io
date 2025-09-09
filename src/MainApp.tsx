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
import { useFeatureFlag } from "./components/FeatureFlagsProvider.tsx";
const Map = React.lazy(() => import("./components/Map/Map.tsx"));

function MainApp() {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(endpoints.routes, { method: "GET" });
				const data = await res.json();
				setData(data);
				const geoApiKey = (import.meta as any).env?.VITE_GEOAPIFY_API_KEY;
				const geoRes = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${geoApiKey || ''}`,
					{ method: 'GET' }
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
				const pbUrl = (import.meta as any).env?.VITE_POCKETBASE_URL || 'https://raghav.pockethost.io';
				const pb = new PocketBase(pbUrl);
				pb.collection('visits').create(logdata);
			} catch (err) {
				console.log('error', err);
			}
		})();
	}, []);

	const values = useContext(AppContext);
	const showMap = useFeatureFlag('map');

	return (
		<div className="MainApp">
			<Suspense fallback={<FallbackSpinner />}>
				<Particles
					style={{ zIndex: -1 }}
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
						{showMap && <Route path="/map" element={<Map />} />}
					</Routes>
				</Suspense>
			</main>
		</div>
	);
}

export default MainApp;
