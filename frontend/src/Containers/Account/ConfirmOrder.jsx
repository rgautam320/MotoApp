import React from "react";
import { useHistory } from "react-router";
import CheckoutSteps from "../../Components/Cart/CheckoutSteps";

const ConfirmOrder = () => {
	const history = useHistory();
	return (
		<>
			<CheckoutSteps activeStep={1} />
			<div className="container">
				<div className="checkout__box">
					<div className="row pt-5">
						<button onClick={() => history.push("/profile/payment")}>Continue</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmOrder;
