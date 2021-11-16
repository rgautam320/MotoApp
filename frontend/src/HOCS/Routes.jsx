import React from "react";
import { Switch, Route } from "react-router";
import Home from "../Containers/Home";
import Error from "../Containers/Error";
import About from "../Containers/About";
import Contact from "../Containers/Contact";
import Products from "../Containers/Products";
import Cart from "../Containers/Cart";
import Auth from "../Containers/Auth";
import ProductDetails from "../Containers/ProductDetails";
import Account from "../Containers/Account";
import Dashboard from "../Containers/Admin/Dashboard";
import Orders from "../Containers/Orders";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/contact" component={Contact} />
			<Route exact path="/products" component={Products} />
			<Route exact path="/product/:id" component={ProductDetails} />
			<Route exact path="/cart" component={Cart} />
			<Route exact path="/auth" component={Auth} />
			<Route exact path="/account" component={Account} />
			<Route exact path="/orders" component={Orders} />
			<Route exact path="/admin/dashboard" component={Dashboard} />
			<Route component={Error} />
		</Switch>
	);
};

export default Routes;
