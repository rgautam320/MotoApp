import React from "react";
import { useHistory } from "react-router";

import CheckoutSteps from "../../Components/Cart/CheckoutSteps";

const Shipping = () => {
	const history = useHistory();
	return (
		<>
			<CheckoutSteps activeStep={0} />
			<div className="container">
				<h1 className="text-center py-3 heading checkout__heading">Shipping</h1>
				<div className="checkout__box">
					<div className="row">
						<div className="col-md-6 col-12 mx-auto">
							<div className="card">
								<h1>Form</h1>
								<button onClick={() => history.push("/profile/confirm")}>Continue</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Shipping;
