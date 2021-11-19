import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import MetaData from "../../HOCS/MetaData";
import { RemoveShoppingCart } from "@material-ui/icons";
import { updateProfile, userActions } from "../../Data/reducers/user.reducer";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import { NavLink } from "react-router-dom";

const Cart = () => {
	const { cart, user, error, isUpdated, success } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const onSave = () => {
		const payload = {
			cart: cart,
		};
		dispatch(updateProfile(payload));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else {
			if (isUpdated && success) {
				alert.success(success);
				dispatch(userActions.reset());
			}
		}
	}, [alert, error, user, dispatch, history, isUpdated, success]);

	return (
		<>
			<MetaData title="Moto App | Cart" />
			<div className="container cart my-5">
				<h1 className="heading cart__heading">Cart</h1>
				{cart?.length > 0 ? (
					<div className="cart__cart">
						<div className="row m-0">
							<div className="col-lg-7 col-md-12 col-12">{cart && cart?.map((val, id) => <CartItem cart={val} key={id} />)}</div>
							<div className="col-lg-5 col-md-12 col-12 ">
								<div className="cart__priceBreakup p-3">
									<h1 className="sub-heading text-center">Price Breakup</h1>
									<hr />
									<h5 className="cart__priceBreakup__lines row">
										<div className="col-7">Price ({cart?.length} Items): </div> <div className="col-5">₹ {cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0)}</div>
									</h5>
									<h5 className="cart__priceBreakup__lines row">
										<div className="col-7">Discount: </div>
										<div className="col-5">₹ {Math.round(cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0) - cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.95)}</div>
									</h5>
									<h5 className="cart__priceBreakup__lines row">
										<div className="col-7">Delivery Charges: </div>
										<div className="col-5">₹ 50</div>
									</h5>
									<hr />
									<h5 className="cart__priceBreakup__lines row">
										<div className="col-7">Total: </div>{" "}
										<div className="col-5">₹ {Math.round(cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0) - cart.reduce((acc, item) => acc + item?.quantity * item?.price, 0) * 0.05 + 50)} </div>
									</h5>
								</div>
								<div className="cart__btns">
									<button className="btn cart__btns__checkout">Checkout</button>
								</div>
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
				{user?.cart?.length > 1 && (
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
