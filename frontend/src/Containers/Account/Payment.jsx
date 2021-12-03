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
				<div className="checkout__box">
					<div className="row pt-5">
						<form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
							<h5>Card Info</h5>
							<div>
								<AiOutlineCreditCard />
								<CardNumberElement className="paymentInput" />
							</div>
							<div>
								<BsCalendarEvent />
								<CardExpiryElement className="paymentInput" />
							</div>
							<div>
								<MdVpnKey />
								<CardCvcElement className="paymentInput" />
							</div>
							<input type="submit" value={`Pay - ₹${1299}`} className="paymentFormBtn" />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
