import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import CartItem from "../../Components/Cart/CartItem";
import { getOrderDetails, orderActions } from "../../Data/reducers/order.reducer";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const id = params.id;
	useEffect(() => {
		dispatch(getOrderDetails(id));
		dispatch(orderActions.reset());
	}, [dispatch, id]);
	const { singleOrder } = useSelector((state) => state.order);
	const { user } = useSelector((state) => state.user);

	return (
		<div className="container">
			<h1 className="heading orders__heading">Order Details</h1>
			<h1 className="sub-heading orders__subheading">Order: #{singleOrder?._id}</h1>
			<hr />
			<div className="row pt-2 pb-5">
				<div className="row m-0">
					<div className="col-lg-7 col-md-12 col-12">
						{singleOrder?.orderItems?.map((val, id) => (
							<CartItem cart={val} key={id} type="orderDetails" />
						))}
					</div>
					<div className="col-lg-5 col-md-12 col-12 ">
						<div className="orders__priceBreakup orders__priceBreakup__small p-3">
							<h1 className="sub-heading text-center">Price Breakup</h1>
							<hr />
							<h5 className="orders__priceBreakup__lines row">
								<div className="col-7">Total: </div> <div className="col-5">₹ {singleOrder?.totalPrice} </div>
							</h5>
						</div>
						<div className="orders__priceBreakup mt-4 p-3">
							<h1 className="sub-heading text-center">Delivery Address</h1>
							<hr />
							<div className="profile__details">
								<div className="profile__info">
									<h4>Name:</h4>
									<p>{user?.name}</p>
								</div>
								<div className="profile__info">
									<h4>Address:</h4>
									<p>{`${user?.address?.phone}, ${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zip}, ${user?.address?.state}, ${user?.address?.country}`}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;
