import React from "react";
import Loader from "../../Utils/Loader";
import Card from "../Product/Card";

const product = {
	name: "Product Name",
	image: [{ url: "https://picsum.photos/200/300" }],
	price: 1200,
	rating: 4.5,
	ratings: 150,
};

const Featured = ({ products, loading }) => {
	return (
		<section id="featured">
			<div className="featured__featured py-5">
				<h1 className="featured__heading pb-4 mb-5">Featured Products</h1>
				{!loading ? (
					<div className="featured__products container px-3">
						<div className="row">{products ? products.map((product, ind) => <Card key={ind} product={product} />) : <Loader />}</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
		</section>
	);
};

export default Featured;
