import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { load } from "../Data/reducers/user.reducer";
import Routes from "./Routes";

import UserOptions from "../Components/Navbar/UserOptions";

const Layout = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { isAuthenticated, user } = useSelector((state) => state.user);
	useEffect(() => {
		if (token) {
			dispatch(load());
		}
	}, [dispatch, token]);
	return (
		<>
			{isAuthenticated && <UserOptions user={user} />}
			<Navbar />
			<Routes />
			<Footer />
		</>
	);
};

export default Layout;
