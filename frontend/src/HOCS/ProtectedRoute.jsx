import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "../Utils/Loader";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const { loading, isAuthenticated, user } = useSelector((state) => state.user);
	console.log(loading);
	return (
		<Fragment>
			{loading === false || loading === undefined ? (
				<Route
					{...rest}
					render={(props) => {
						if (isAuthenticated === false) {
							return <Redirect to="/auth" />;
						}
						if (isAdmin === true && user.role !== "admin") {
							return <Redirect to="/auth" />;
						}
						return <Component {...props} />;
					}}
				/>
			) : (
				<Loader />
			)}
		</Fragment>
	);
};

export default ProtectedRoute;
