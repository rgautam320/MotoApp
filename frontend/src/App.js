import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import aos from "aos";
import webfont from "webfontloader";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./Data/store";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-multi-carousel/lib/styles.css";
import "./SCSS/_main.scss";

import Layout from "./HOCS/Layout";
import { load } from "./Data/reducers/user.reducer";

aos.init();

const App = () => {
	useEffect(() => {
		webfont.load({
			google: {
				families: ["Roboto", "sans-serif"],
			},
		});
		store.dispatch(load());
	}, []);

	const options = {
		timeout: 5000,
		position: positions.TOP_RIGHT,
		transition: transitions.FADE,
	};
	return (
		<>
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...options}>
					<BrowserRouter>
						<Layout />
					</BrowserRouter>
				</AlertProvider>
			</Provider>
		</>
	);
};

export default App;
