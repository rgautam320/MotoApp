import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../Containers/Admin/Dashboard";
import Orders from "../Containers/Admin/Orders";
import Products from "../Containers/Admin/Products";
import Reviews from "../Containers/Admin/Reviews";
import Users from "../Containers/Admin/Users";

const AdminRoutes = () => {
	return (
		<Switch>
			<Route exact path="/admin/dashboard" component={Dashboard} />
			<Route exact path="/admin/dashboard/products" component={Products} />
			<Route exact path="/admin/dashboard/orders" component={Orders} />
			<Route exact path="/admin/dashboard/users" component={Users} />
			<Route exact path="/admin/dashboard/reviews" component={Reviews} />
		</Switch>
	);
};

export default AdminRoutes;
