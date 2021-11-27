import React from "react";
import { useHistory } from "react-router";

import { BsFillCheckCircleFill } from "react-icons/bs";

const OrderSuccess = () => {
	const history = useHistory();
	return (
		<>
			<div className="container">
				<div className="row pt-5">
					<BsFillCheckCircleFill color="blue" fontSize="5rem" cursor="pointer" />
					<div className="text-center checkout__box">
						<h1 className="pt-4">Payment Successful</h1>
						<button className="btn checkout__products" onClick={() => history.push("/products")}>
							View More Products
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderSuccess;
