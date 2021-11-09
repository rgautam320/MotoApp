import React from "react";
import { Helmet } from "react-helmet";

const Cart = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Cart</title>
				<meta name="description" content="Moto App - Cart Page" />
			</Helmet>
			<div className="container">
				<div className="cart_cart">
					<h1 className="text-center">Cart</h1>
				</div>
			</div>
		</>
	);
};

export default Cart;
