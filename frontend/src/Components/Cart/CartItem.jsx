import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../Data/reducers/user.reducer";

const CartItem = ({ cart }) => {
	const disptach = useDispatch();
	const [quantity, setQuantity] = useState(cart?.quantity);

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
		disptach(userActions.cart(payload));
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
		disptach(userActions.cart(payload));
	};
	const onRemove = () => {
		disptach(userActions.cartRemove(cart?.product));
	};
	return (
		<>
			<div className="cart__cartItem">
				<div className="row">
					<div className="col-md-4 col-6 mx-auto">
						<img src={cart?.image} alt="Cart Avatar" />
						<div className="product__quantity my-2">
							<button className="btn product__quantity__btn" onClick={decreaseItem}>
								-
							</button>
							<input className="product__quantity__input mx-2" type="number" readOnly defaultValue={1} value={quantity} />
							<button className="btn product__quantity__btn" onClick={increaseItem}>
								+
							</button>
						</div>
					</div>
					<div className="col-md-8 col-6 cart__details py-3">
						<p>#{cart?.product}</p>
						<h5>{cart?.name}</h5>
						<h4>₹{cart?.price * quantity}</h4>
						<button className="cart__cartItem__remove" onClick={onRemove}>
							Remove
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartItem;
