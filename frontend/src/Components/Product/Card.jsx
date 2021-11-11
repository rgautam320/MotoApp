import React from "react";
import ReactRatings from "react-rating-stars-component";

const Card = ({ product }) => {
	const options = {
		value: product.rating,
		readOnly: true,
		isHalf: true,
		size: 20,
		edit: false,
	};
	return (
		<div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-10 mx-auto my-3">
			<div className="card__card">
				<img className="card__card__img" src={product?.image[0]?.url} alt={product?.name} />
				<div className="card__card__info">
					<h5 className="card__card__info__name">{product?.name}</h5>
					<div className="card__card__info__rating">
						<ReactRatings {...options} />
						<h6 className="card__card__info__rating__review">{product?.ratings} Reviews</h6>
					</div>
					<h5 className="card__card__info__price">${product?.price}</h5>
				</div>
				<div className="card__card__add">
					<button>Add to Cart</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
