import React from "react";
import { Rating } from "@material-ui/lab";

import DefaultUser from "../../Assets/default-user.png";

const Review = ({ review }) => {
	const options = {
		value: review.rating,
		readOnly: true,
		size: "large",
	};
	return (
		<div className="review">
			<div className="review__review">
				<div className="review__imageBox">
					<img className="review__image" src={DefaultUser} alt="Default User" />
				</div>
				<div className="review__details">
					<h3 className="sub-heading py-3 text-center">{review?.name}</h3>

					<div className="d-flex justify-content-center">
						<Rating {...options} />
					</div>

					<hr />
					<div className="review__comment">
						<p className="review__comment__text p-3">{review?.comment}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Review;
