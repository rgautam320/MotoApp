import React, { useEffect } from "react";
import { useHistory } from "react-router";

import { BsFillCheckCircleFill } from "react-icons/all";

const OrderSuccess = () => {
	const history = useHistory();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<div className="container pt-5 mt-5">
				<div className="row pt-5 mt-5">
					<BsFillCheckCircleFill color="blue" fontSize="5rem" cursor="pointer" />
					<div className="text-center" style={{ minHeight: "42.25vh" }}>
						<h1 className="pt-4">Payment Successful</h1>
						<button className="btn orderSuccess__products" onClick={() => history.push("/products")}>
							View More Products
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default OrderSuccess;
