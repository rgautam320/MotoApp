import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../Containers/Admin/Dashboard";
import Orders from "../Containers/Admin/Orders";
import Products from "../Containers/Admin/Products";
import Users from "../Containers/Admin/Users";

const AdminRoutes = () => {
    return (
        <Switch>
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/dashboard/products" component={Products} />
            <Route exact path="/admin/dashboard/orders" component={Orders} />
            <Route exact path="/admin/dashboard/users" component={Users} />
        </Switch>
    );
};

export default AdminRoutes;
