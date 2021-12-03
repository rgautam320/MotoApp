import React from "react";
import { Switch, Route } from "react-router";

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
import Shipping from "../Containers/Account/Shipping";
import Dashboard from "../Containers/Admin/Dashboard";
import Profile from "../Containers/Auth/Profile";
import UpdateProfile from "../Containers/Auth/UpdateProfile";
import ChangePassword from "../Containers/Auth/ChangePassword";
import ForgotPassword from "../Containers/Auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../Containers/Auth/ResetPassword";
import Payment from "../Containers/Account/Payment";
import OrderSuccess from "../Containers/Account/OrderSuccess";
import ConfirmOrder from "../Containers/Account/ConfirmOrder";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const Routes = () => {
	const { stripeAPIKey } = useSelector((state) => state.order);
	window.addEventListener("contextmenu", (e) => e.preventDefault());

	return (
		<>
			<Switch>
				{/* Normal Routes */}
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={About} />
				<Route exact path="/contact" component={Contact} />
				<Route exact path="/products" component={Products} />
				<Route exact path="/product/:id" component={ProductDetails} />
				<Route exact path="/auth" component={Auth} />
				<Route exact path="/profile/forgot-password" component={ForgotPassword} />
				<Route exact path="/profile/password-reset/:token" component={ResetPassword} />

				{/* Authenticated Routes */}

				<ProtectedRoute exact path="/cart" component={Cart} />
				<ProtectedRoute exact path="/account" component={Account} />
				<ProtectedRoute exact path="/orders" component={Orders} />
				<ProtectedRoute exact path="/profile" component={Profile} />
				<ProtectedRoute exact path="/profile/update" component={UpdateProfile} />
				<ProtectedRoute exact path="/profile/change-password" component={ChangePassword} />
				<ProtectedRoute exact path="/profile/shipping" component={Shipping} />
				<ProtectedRoute exact path="/profile/confirm" component={ConfirmOrder} />
				<ProtectedRoute exact path="/profile/success" component={OrderSuccess} />
				{stripeAPIKey && (
					<Elements stripe={loadStripe(stripeAPIKey)}>
						<ProtectedRoute exact path="/profile/payment" component={Payment} />
					</Elements>
				)}

				{/* Admin Routes */}

				<ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />

				{/* Error Route */}
				<Route component={Error} />
			</Switch>
		</>
	);
};

export default Routes;
