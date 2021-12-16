import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartActions } from "../../Data/reducers/cart.reducer";

const CartItem = ({ cart, type }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const [quantity, setQuantity] = useState(cart?.quantity || 1);

	const increaseItem = () => {
		if (quantity >= 6) {
			setQuantity(6);
		} else {
			setQuantity(quantity + 1);
		}
		const payload = {
			product: cart?.product,
			name: cart?.name,
			price: cart?.price,
			quantity: quantity + 1 >= 6 ? 6 : quantity + 1,
			image: cart?.image,
		};
		dispatch(cartActions.cart(payload));
	};
	const decreaseItem = () => {
		if (quantity === 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
		}
		const payload = {
			product: cart?.product,
			name: cart?.name,
			price: cart?.price,
			quantity: quantity - 1 >= 1 ? quantity - 1 : 1,
			image: cart?.image,
		};
		dispatch(cartActions.cart(payload));
	};
	const onRemove = () => {
		dispatch(cartActions.cartRemove(cart?.product));
		alert.success("Product removed from cart.");
	};
	return (
		<>
			<div className="cart__cartItem">
				<div className="row">
					<div className="col-md-4 col-6 mx-auto">
						<img src={cart?.image} alt="Cart Avatar" />
						{type === null && (
							<div className="cart__quantity my-2">
								<button className="btn cart__quantity__btn" onClick={decreaseItem}>
									-
								</button>
								<input className="cart__quantity__input mx-2" type="number" readOnly value={quantity} />
								<button className="btn cart__quantity__btn" onClick={increaseItem}>
									+
								</button>
							</div>
						)}
					</div>
					<div className="col-md-8 col-6 cart__details py-3">
						<NavLink to={`/product/${cart?.product}`}>#{cart?.product}</NavLink>
						<h5>{cart?.name}</h5>
						<h4>₹{cart?.price * quantity}</h4>
						{type === null && (
							<button className="cart__cartItem__remove" onClick={onRemove}>
								Remove
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CartItem;
