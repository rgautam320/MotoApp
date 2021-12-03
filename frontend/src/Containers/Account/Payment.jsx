import React from "react";
import { useHistory } from "react-router";

import CheckoutSteps from "../../Components/Cart/CheckoutSteps";
import MetaData from "../../HOCS/MetaData";

import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AiOutlineCreditCard, BsCalendarEvent, MdVpnKey } from "react-icons/all";

const Payment = () => {
	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<MetaData title="Moto App | Payment" />
			<CheckoutSteps activeStep={2} />
			<div className="container">
				<div className="checkout__box checkout__box__medium">
					<div className="row pt-5">
						<form className="checkout__payment" onSubmit={(e) => submitHandler(e)}>
							<h3>Card Info</h3>
							<hr />
							<div className="checkout__payment__inputBox">
								<AiOutlineCreditCard />
								<CardNumberElement className="checkout__payment__input" />
							</div>
							<div className="checkout__payment__inputBox">
								<BsCalendarEvent />
								<CardExpiryElement className="checkout__payment__input" />
							</div>
							<div className="checkout__payment__inputBox">
								<MdVpnKey />
								<CardCvcElement className="checkout__payment__input" />
							</div>
							<div className="checkout__payment__buttonBox">
								<input type="submit" value={`Pay - ₹${1299}`} className="checkout__payment__button" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
