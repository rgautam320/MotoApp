import React from "react";
import { useHistory } from "react-router";

import CheckoutSteps from "../../Components/Cart/CheckoutSteps";
import MetaData from "../../HOCS/MetaData";

const Payment = () => {
	const history = useHistory();
	return (
		<>
			<MetaData title="Moto App | Payment" />
			<CheckoutSteps activeStep={2} />
			<div className="container">
				<div className="checkout__box">
					<div className="row pt-5">
						<button onClick={() => history.push("/profile/success")}>Continue</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payment;
