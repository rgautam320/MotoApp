import React from "react";
import { Helmet } from "react-helmet";

const Products = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Products</title>
				<meta name="description" content="Moto App - Products Page" />
			</Helmet>
			<div className="container">
				<div className="products_products">
					<h1 className="text-center">Products</h1>
				</div>
			</div>
		</>
	);
};

export default Products;
