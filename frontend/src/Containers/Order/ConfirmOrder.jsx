import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import CartItem from "../../Components/Cart/CartItem";
import CheckoutSteps from "../../Components/Cart/CheckoutSteps";
import { updateProfile, userActions } from "../../Data/reducers/user.reducer";
import MetaData from "../../HOCS/MetaData";

const ConfirmOrder = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isUpdated, error, user, success } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.user).user;
    const { price } = useSelector((state) => state.order);

    const onContinue = async () => {
        const payload = {
            cart: cart,
        };

        await dispatch(updateProfile(payload));
        history.push("/profile/payment");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!price) {
            history.push("/cart");
        }
        if (error) {
            alert.error(error);
        } else {
            if (isUpdated && success) {
                alert.success(success);
                dispatch(userActions.reset());
            }
        }
    }, [alert, error, dispatch, history, isUpdated, success, price]);

    return (
        <>
            <MetaData title="Moto App | Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="container">
                <div className="row pt-5">
                    <div className="col-lg-7 col-md-12 col-12">
                        {cart && cart?.map((val, id) => <CartItem cart={val} key={id} type="confirmOrder" />)}
                    </div>
                    <div className="col-lg-5 col-md-12 col-12 ">
                        <div className="confirmOrder__priceBreakup p-3">
                            <h1 className="sub-heading text-center">Price Breakup</h1>
                            <hr />
                            <h5 className="confirmOrder__priceBreakup__lines row">
                                <div className="col-7">Price ({cart?.length} Items): </div>{" "}
                                <div className="col-5">
                                    ₹ {cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0)}
                                </div>
                            </h5>
                            <h5 className="confirmOrder__priceBreakup__lines row">
                                <div className="col-7">Discount: </div>
                                <div className="col-5">
                                    ₹{" "}
                                    {Math.round(
                                        cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) -
                                            cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.95
                                    )}
                                </div>
                            </h5>
                            <h5 className="confirmOrder__priceBreakup__lines row">
                                <div className="col-7">Delivery Charges: </div>
                                <div className="col-5">₹ 50</div>
                            </h5>
                            <hr />
                            <h5 className="confirmOrder__priceBreakup__lines row">
                                <div className="col-7">Total: </div>{" "}
                                <div className="col-5">
                                    ₹{" "}
                                    {Math.round(
                                        cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) -
                                            cart?.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.05 +
                                            50
                                    )}{" "}
                                </div>
                            </h5>
                        </div>
                        <div className="confirmOrder__priceBreakup mt-4 p-3">
                            <h1 className="sub-heading text-center">Delivery Address</h1>
                            <hr />
                            <div>
                                <div className="confirmOrder__info">
                                    <h4>Name:</h4>
                                    <p>{user?.name}</p>
                                </div>
                                <div className="confirmOrder__info">
                                    <h4>Address:</h4>
                                    <p>{`${user?.address?.phone}, ${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zip}, ${user?.address?.state}, ${user?.address?.country}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="confirmOrder__continue my-4" onClick={onContinue}>
                    Continue
                </button>
            </div>
        </>
    );
};

export default ConfirmOrder;
