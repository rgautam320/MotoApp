import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import ReviewCarousel from "react-multi-carousel";
import { Rating } from "@material-ui/lab";

import { Loader } from "../../Utils/Loader";
import { getSingleProduct, productActions, writeReview } from "../../Data/reducers/product.reducer";
import Review from "../../Components/Product/Review";
import { userActions } from "../../Data/reducers/user.reducer";
import ReviewDialog from "../../Components/Product/ReviewDialog";
import { getMyOrders } from "../../Data/reducers/order.reducer";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 1,
	},
	miniLaptop: {
		breakpoint: { max: 1280, min: 1024 },
		items: 3,
		slidesToSlide: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1,
	},
};
const ProductDetails = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();
	const alert = useAlert();
	const { singleProduct, loading, error, success } = useSelector((state) => state.product);
	const { isAuthenticated } = useSelector((state) => state.user);
	const { orders } = useSelector((state) => state.order);

	const [quantity, setQuantity] = useState(1);
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	let myOrders = [];
	orders?.forEach((element) => {
		element?.orderItems?.forEach((item) => {
			myOrders.push(item?.product);
		});
	});
	const isOrdered = myOrders.find((item) => item === id);
	const submitReviewToggle = () => {
		setOpen(!open);
	};

	const reviewSubmitHandler = () => {
		const payload = {
			id: id,
			comment: comment,
			rating: rating,
		};
		dispatch(writeReview(payload));
		dispatch(productActions.reset());
		submitReviewToggle();
	};

	const options = {
		value: singleProduct.rating,
		readOnly: true,
		size: "large",
	};

	const increaseItem = () => {
		if (singleProduct?.stock === quantity) {
			setQuantity(singleProduct?.stock);
		} else {
			setQuantity(quantity + 1);
		}
	};
	const decreaseItem = () => {
		if (quantity === 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
		}
	};

	const addToCart = () => {
		const payload = {
			product: id,
			name: singleProduct?.name,
			price: singleProduct?.price,
			quantity: quantity,
			image: singleProduct?.images[0]?.url,
		};
		dispatch(userActions.cart(payload));
		dispatch(userActions.reset());
		alert.success("Product added to cart.");
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else if (success) {
			alert.success(success);
		}
		dispatch(getSingleProduct(id));
		dispatch(getMyOrders());
		dispatch(userActions.reset());
	}, [dispatch, id, error, alert, success]);

	return (
		<div className="container my-5">
			<ReviewDialog open={open} comment={comment} setComment={setComment} rating={rating} setRating={setRating} submitReviewToggle={submitReviewToggle} reviewSubmitHandler={reviewSubmitHandler} />
			<h1 className="heading product__title">Product Details</h1>
			{!loading ? (
				<>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-5">
							<Carousel>
								{singleProduct &&
									singleProduct?.images?.map((image, ind) => (
										<div className="product__imageBox" key={ind}>
											<img className="product__image" src={image?.url} alt={`${ind} Slide`} />
										</div>
									))}
							</Carousel>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-12">
							<h2 className="sub-heading product__name">{singleProduct?.name}</h2>
							<p className="product__id">#{singleProduct?._id}</p>
							<div className="product__rating">
								<Rating {...options} />
								<h6 className="product__rating__reviews">{singleProduct?.reviews?.length} Reviews</h6>
							</div>
							<div className="product__price">
								<h3>₹{singleProduct?.price}</h3>
							</div>
							<div className="product__quantityBox">
								<div className="product__quantity">
									<button className="btn product__quantity__btn" onClick={decreaseItem}>
										-
									</button>
									<input className="product__quantity__input" type="number" readOnly value={quantity} />
									<button className="btn product__quantity__btn" onClick={increaseItem}>
										+
									</button>
								</div>
								<div className="product__add">
									<button disabled={!isAuthenticated} className="btn product__add__btn" onClick={addToCart}>
										Add to Cart
									</button>
								</div>
							</div>
							<div className="product__status">
								<h5>
									Status: <span className={`${singleProduct?.stock < 1 ? "product__status__out" : "product__status__in"}`}>{singleProduct?.stock < 1 ? "Out of Stock" : "In Stock"} </span>
								</h5>
							</div>
							<div className="product__reviews">
								<button disabled={!isOrdered} onClick={submitReviewToggle} className="btn product__add__btn">
									Add Review
								</button>
							</div>
						</div>
					</div>
					<div id="description" className="product__description">
						<h2 className="sub-heading product__description__heading text-center py-4">Product Description</h2>
						<pre className="product__description__text">{singleProduct?.description}</pre>
					</div>
					<div id="review" className="product__reviews">
						<h2 className="sub-heading product__description__heading text-center py-4">Reviews</h2>
						{singleProduct?.reviews?.length > 0 ? (
							<ReviewCarousel
								swipeable={true}
								draggable={true}
								showDots={true}
								responsive={responsive}
								ssr={true}
								infinite={true}
								autoPlay={true}
								autoPlaySpeed={5000}
								keyBoardControl={true}
								transitionDuration={1000}
								containerClass="carousel-container"
								removeArrowOnDeviceType={["tablet", "mobile"]}
								dotListClass="custom-dot-list-style"
								itemClass="carousel-item-padding-40-px"
							>
								{singleProduct?.reviews?.map((review, ind) => (
									<Review key={ind} review={review} />
								))}
							</ReviewCarousel>
						) : (
							<h3 className="text-center py-5">No Reviews Yet</h3>
						)}
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default ProductDetails;
