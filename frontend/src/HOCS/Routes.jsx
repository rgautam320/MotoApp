import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

import Home from "../Containers/Home/Home";
import Error from "../Containers/Error/Error";
import About from "../Containers/About/About";
import Contact from "../Containers/Contact/Contact";
import Products from "../Containers/Product/Products";
import Auth from "../Containers/Auth/Auth";
import ProductDetails from "../Containers/Product/ProductDetails";
import Cart from "../Containers/Account/Cart";
import Account from "../Containers/Account/Account";
import Orders from "../Containers/Account/Orders";
import Dashboard from "../Containers/Admin/Dashboard";
import Profile from "../Containers/Auth/Profile";
import UpdateProfile from "../Containers/Auth/UpdateProfile";
import ChangePassword from "../Containers/Auth/ChangePassword";
import { Loader } from "../Utils/Loader";

const Routes = () => {
	const token = localStorage.getItem("token");
	const { loading } = useSelector((state) => state.user);

	return (
		<Switch>
			{/* Normal Routes */}
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/contact" component={Contact} />
			<Route exact path="/products" component={Products} />
			<Route exact path="/product/:id" component={ProductDetails} />
			<Route exact path="/auth" component={Auth} />

			{/* Authenticated Routes */}

			{token ? (
				<>
					<Route exact path="/cart" component={loading ? Loader : Cart} />
					<Route exact path="/account" component={loading ? Loader : Account} />
					<Route exact path="/orders" component={loading ? Loader : Orders} />
					<Route exact path="/profile" component={loading ? Loader : Profile} />
					<Route exact path="/profile/update" component={loading ? Loader : UpdateProfile} />
					<Route exact path="/profile/change-password" component={loading ? Loader : ChangePassword} />
				</>
			) : (
				<Redirect to="/" />
			)}

			{/* Admin Routes */}

			<Route exact path="/admin/dashboard" component={Dashboard} />

			{/* Error Route */}
			<Route component={Error} />
		</Switch>
	);
};

export default Routes;
