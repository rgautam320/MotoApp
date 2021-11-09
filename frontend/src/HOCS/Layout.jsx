import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Routes from "./Routes";

const Layout = () => {
	return (
		<>
			<Navbar />
			<Routes />
			<Footer />
		</>
	);
};

export default Layout;
