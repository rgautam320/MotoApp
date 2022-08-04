import React, { useEffect } from "react";
import { Switch, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Home from "../Containers/Home/Home";
import Error from "../Containers/Error/Error";
import About from "../Containers/About/About";
import Contact from "../Containers/Contact/Contact";
import Products from "../Containers/Product/Products";
import Auth from "../Containers/Auth/Auth";
import ProductDetails from "../Containers/Product/ProductDetails";
import Cart from "../Containers/Order/Cart";
import Orders from "../Containers/Order/Orders";
import Shipping from "../Containers/Order/Shipping";
import Profile from "../Containers/Auth/Profile";
import UpdateProfile from "../Containers/Auth/UpdateProfile";
import ChangePassword from "../Containers/Auth/ChangePassword";
import ForgotPassword from "../Containers/Auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../Containers/Auth/ResetPassword";
import Payment from "../Containers/Order/Payment";
import ConfirmOrder from "../Containers/Order/ConfirmOrder";
import OrderDetails from "../Containers/Order/OrderDetails";
import ActivateAccount from "../Containers/Auth/ActivateAccount";
import AdminLayout from "./AdminLayout";

import { getCart } from "../Data/reducers/cart.reducer";

const Routes = () => {
    const dispatch = useDispatch();

    const { stripeAPIKey } = useSelector((state) => state.order);
    window.addEventListener("contextmenu", (e) => e.preventDefault());

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

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
                <Route exact path="/profile/activate-profile/:token" component={ActivateAccount} />

                {/* Admin Routes */}
                <ProtectedRoute path="/admin/dashboard" component={AdminLayout} isAdmin={true} />

                {/* Authenticated Routes */}
                <ProtectedRoute exact path="/cart" component={Cart} />
                <ProtectedRoute exact path="/orders" component={Orders} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/profile/update" component={UpdateProfile} />
                <ProtectedRoute exact path="/profile/change-password" component={ChangePassword} />
                <ProtectedRoute exact path="/orders" component={Orders} />
                <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

                {/* Payment Routes */}
                <ProtectedRoute exact path="/profile/shipping" component={Shipping} />
                <ProtectedRoute exact path="/profile/confirm" component={ConfirmOrder} />

                <Elements stripe={loadStripe(stripeAPIKey || "empty")}>
                    <ProtectedRoute exact path="/profile/payment" component={Payment} />
                </Elements>

                {/* Error Route */}
                <Route component={Error} />
            </Switch>
        </>
    );
};

export default Routes;
