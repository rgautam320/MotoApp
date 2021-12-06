import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

import CheckoutSteps from "../../Components/Cart/CheckoutSteps";
import MetaData from "../../HOCS/MetaData";

import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AiOutlineCreditCard, BsCalendarEvent, MdVpnKey } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder, makePayment, orderActions } from "../../Data/reducers/order.reducer";
import { updateProfile, userActions } from "../../Data/reducers/user.reducer";
import { SmallLoader } from "../../Utils/Loader";

const Payment = () => {
	const history = useHistory();
	const alert = useAlert();
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.user);
	const { price, loading } = useSelector((state) => state.order);

	let order = {
		address: user?.address,
		orderItems: user?.cart,
		itemsPrice: price?.price,
		taxPrice: 0,
		shippingPrice: price?.delivery,
		totalPrice: price?.total,
	};
	console.log(user?.address);

	const submitHandler = async (e) => {
		e.preventDefault();
		const { payload } = await dispatch(makePayment(price?.total * 100));
		if (!stripe || !elements) {
			return;
		}
		const client_secret = payload?.client_secret;
		const result = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardNumberElement),
				billing_details: {
					name: user?.name,
					email: user?.email,
					address: {
						line1: user?.address?.street,
						city: user?.address?.city,
						state: user?.address?.state,
						postal_code: user?.address?.zip,
						country: user?.address?.country,
					},
				},
			},
		});
		if (result?.error) {
			alert.error(result?.error?.message);
		} else {
			if (result?.paymentIntent?.status === "succeeded") {
				order.paymentInfo = {
					id: result?.paymentIntent?.id,
					status: result?.paymentIntent?.status,
				};
				const { payload } = await dispatch(makeOrder(order));
				history.push("/");
				if (payload?.message) {
					dispatch(userActions.resetCartOnly());
					dispatch(updateProfile({ cart: [] }));
					dispatch(userActions.reset());
					alert.success("Order Placed Successfully");
				} else {
					alert.error("Something went wrong, will get back to you soon.");
				}
				dispatch(orderActions.reset());
			} else {
				alert.error("There's some issue while processing payment ");
			}
		}
	};

	useEffect(() => {
		if (!price) {
			history.push("/cart");
		}
	}, [price, history]);
	return (
		<>
			<MetaData title="Moto App | Payment" />
			<CheckoutSteps activeStep={2} />
			<div className="container">
				<div className="payment__box payment__box__medium">
					<div className="row pt-5">
						<form className="payment__payment" onSubmit={(e) => submitHandler(e)}>
							<h3>Card Info</h3>
							<hr />
							<div className="payment__payment__inputBox">
								<AiOutlineCreditCard />
								<CardNumberElement className="payment__payment__input" />
							</div>
							<div className="payment__payment__inputBox">
								<BsCalendarEvent />
								<CardExpiryElement className="payment__payment__input" />
							</div>
							<div className="payment__payment__inputBox">
								<MdVpnKey />
								<CardCvcElement className="payment__payment__input" />
							</div>
							<div className="payment__payment__buttonBox">{loading ? <SmallLoader /> : <input type="submit" value={`Pay - ₹${price?.total}`} className="payment__payment__button" />}</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
