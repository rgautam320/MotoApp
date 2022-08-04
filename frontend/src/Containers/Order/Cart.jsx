import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";

import { cartActions } from "../../Data/reducers/cart.reducer";
import { orderActions } from "../../Data/reducers/order.reducer";
import { updateCart } from "../../Data/reducers/cart.reducer";
import { updateProfile } from "../../Data/reducers/user.reducer";

import CartItem from "../../Components/Cart/CartItem";
import MetaData from "../../HOCS/MetaData";

const Cart = () => {
    const { user, error, isUpdated, success } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems;

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const price = {
        price: cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0),
        discount: Math.round(
            cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) -
                cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.95
        ),
        delivery: 50,
        total: Math.round(
            cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) -
                cartItems?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.05 +
                50
        ),
    };

    const onSave = () => {
        dispatch(cartActions.reset());
        dispatch(orderActions.setPrice(price));
        dispatch(updateCart(cartItems));
        dispatch(updateProfile({ cart: cart.cartItems }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (error) {
            alert.error(error);
        } else if (isUpdated && success) {
            alert.success(success);
            dispatch(cartActions.reset());
        }
    }, [alert, error, user, dispatch, history, isUpdated, success]);

    return (
        <>
            <MetaData title="Moto App | Cart" />
            <div className="container cart my-5">
                <h1 className="heading cart__heading">Cart</h1>

                {cartItems?.length > 0 ? (
                    <div className="row m-0 p-0">
                        <div className="col-lg-7 col-md-12 col-12">
                            {cartItems && cartItems?.map((val, id) => <CartItem cart={val} key={id} type={null} />)}
                        </div>
                        <div className="col-lg-5 col-md-12 col-12">
                            <div className="cart__priceBreakup p-3">
                                <h1 className="sub-heading text-center">Price Breakup</h1>
                                <hr />
                                <h5 className="cart__priceBreakup__lines row">
                                    <div className="col-7">Price ({cartItems?.length} Items): </div>{" "}
                                    <div className="col-5">₹ {price?.price}</div>
                                </h5>
                                <h5 className="cart__priceBreakup__lines row">
                                    <div className="col-7">Discount: </div>
                                    <div className="col-5">₹ {price?.discount}</div>
                                </h5>
                                <h5 className="cart__priceBreakup__lines row">
                                    <div className="col-7">Delivery Charges: </div>
                                    <div className="col-5">₹ {price?.delivery}</div>
                                </h5>
                                <hr />
                                <h5 className="cart__priceBreakup__lines row">
                                    <div className="col-7">Total: </div> <div className="col-5">₹ {price?.total} </div>
                                </h5>
                            </div>
                            <div className="cart__btns cart__btns__saveBox w-100">
                                <button className="btn cart__btns__save" onClick={onSave}>
                                    Save Your Cart
                                </button>
                            </div>
                            <div className="cart__btns cart__btns__saveBox w-100">
                                <button
                                    onClick={() => {
                                        history.push("/profile/shipping");
                                        onSave();
                                    }}
                                    className="btn cart__btns__checkout"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <center className="pt-5">
                        <RemoveShoppingCart style={{ fontSize: 60 }} color="secondary" />
                        <h1 className="cart__noItem">No Items in Cart</h1>
                        <div className="cart__btns cart__btns__saveBox">
                            <NavLink to="/products" className="btn cart__btns__product">
                                View More Products
                            </NavLink>
                        </div>
                    </center>
                )}

                {cartItems?.length > 0 && cartItems?.length === 0 && (
                    <div className="cart__btns cart__btns__saveBox">
                        <button className="btn cart__btns__save" onClick={onSave}>
                            Save Your Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
