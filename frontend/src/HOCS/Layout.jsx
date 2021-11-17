import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Routes from "./Routes";

import UserOptions from "../Components/Navbar/UserOptions";

const Layout = () => {
	const { isAuthenticated, user, loading } = useSelector((state) => state.user);
	return (
		<>
			{isAuthenticated && <UserOptions user={user} />}
			<Navbar />
			<Routes />
			{!loading && <Footer />}
		</>
	);
};

export default Layout;
