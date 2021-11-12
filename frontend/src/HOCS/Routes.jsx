import React from "react";
import { Switch, Route } from "react-router";
import Home from "../Containers/Home";
import Error from "../Containers/Error";
import About from "../Containers/About";
import Contact from "../Containers/Contact";
import Products from "../Containers/Products";
import Search from "../Containers/Search";
import Cart from "../Containers/Cart";
import Auth from "../Containers/Auth";
import ProductDetails from "../Containers/ProductDetails";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/about" component={About} />
			<Route exact path="/contact" component={Contact} />
			<Route exact path="/products" component={Products} />
			<Route exact path="/product/:id" component={ProductDetails} />
			<Route exact path="/Search" component={Search} />
			<Route exact path="/Cart" component={Cart} />
			<Route exact path="/Auth" component={Auth} />
			<Route component={Error} />
		</Switch>
	);
};

export default Routes;
