import React from "react";
import ReactRatings from "react-rating-stars-component";
import { NavLink } from "react-router-dom";

const Card = ({ product, styles }) => {
	const options = {
		value: product.rating,
		readOnly: true,
		isHalf: true,
		size: 20,
		edit: false,
	};
	return (
		<div className={styles}>
			<div className="card__card">
				<NavLink exact to={`/product/${product?._id}`}>
					<img className="card__card__img" src={product?.images[0]?.url} alt={product?.name} />
					<div className="card__card__info">
						<h5 className="card__card__info__name">{product?.name}</h5>
						<div className="card__card__info__rating">
							<ReactRatings {...options} />
							<h6 className="card__card__info__rating__review">{product?.reviews?.length} Reviews</h6>
						</div>
						<h5 className="card__card__info__price">${product?.price}</h5>
					</div>
				</NavLink>
				<div className="card__card__add">
					<button>Add to Cart</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
