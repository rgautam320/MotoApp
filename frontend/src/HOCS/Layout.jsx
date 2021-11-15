import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { load } from "../Data/reducers/user.reducer";
import Routes from "./Routes";

const Layout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(load());
	}, [dispatch]);
	return (
		<>
			<Navbar />
			<Routes />
			<Footer />
		</>
	);
};

export default Layout;
