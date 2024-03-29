import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const { isAuthenticated, user } = useSelector((state) => state.user);
	return (
		<Fragment>
			<Route
				{...rest}
				render={(props) => {
					if (isAuthenticated === false) {
						return <Redirect to="/auth" />;
					}
					if (isAdmin === true && user?.role === "user") {
						return <Redirect to="/auth" />;
					}
					return <Component {...props} />;
				}}
			/>
		</Fragment>
	);
};

export default ProtectedRoute;
