import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import aos from "aos";
import webfont from "webfontloader";

import { store } from "./Data/store";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./SCSS/_main.scss";

import Layout from "./HOCS/Layout";

aos.init();

const App = () => {
	useEffect(() => {
		webfont.load({
			google: {
				families: ["Roboto", "sans-serif"],
			},
		});
	}, []);
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</Provider>
		</>
	);
};

export default App;
