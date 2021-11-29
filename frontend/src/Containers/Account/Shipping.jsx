import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

import { Country, State } from "country-state-city";
import { MdPinDrop, MdPublic, MdTransferWithinAStation } from "react-icons/md";
import { BiStreetView } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";

import CheckoutSteps from "../../Components/Cart/CheckoutSteps";
import Input from "../../Components/Shared/Input";
import { updateProfile, userActions } from "../../Data/reducers/user.reducer";

const Shipping = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();

	const { isUpdated, error, user, success } = useSelector((state) => state.user);

	const [address, setAddress] = useState({
		street: user?.address?.street,
		city: user?.address?.city,
		zip: user?.address?.zip,
		country: user?.address?.country,
		state: user?.address?.state,
		phone: user?.address?.phone,
	});

	const onAddressChange = (e) => {
		setAddress({ ...address, [e.target.name]: e.target.value });
	};

	const onContinue = () => {
		const payload = {
			address: address,
		};

		dispatch(updateProfile(payload));
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else {
			if (isUpdated && success) {
				alert.success(success);
				history.push("/profile/confirm");
				dispatch(userActions.reset());
			}
		}
	}, [alert, error, dispatch, history, isUpdated, success]);
	return (
		<>
			<CheckoutSteps activeStep={0} />
			<div className="container">
				<div className="checkout__box checkout__box__updateBox">
					<div className="checkout__input">
						<Input name="street" type="text" label="Street" value={address?.street} icon={<BiStreetView />} handleChange={onAddressChange} />
					</div>
					<div className="checkout__input">
						<Input name="city" type="text" label="City" value={address?.city} icon={<FaCity />} handleChange={onAddressChange} />
					</div>
					<div className="checkout__input">
						<Input name="zip" type="text" label="Zip Code" value={address?.zip} icon={<MdPinDrop />} handleChange={onAddressChange} />
					</div>
					<div className="checkout__input">
						<Input name="phone" type="text" label="Phone Number" value={address?.phone} icon={<AiFillPhone />} handleChange={onAddressChange} />
					</div>

					<div className="checkout__CountryState">
						<MdPublic />
						<select className="checkout__countryState" defaultValue={address?.country} onBlur={(e) => setAddress({ ...address, country: e.target.value })}>
							{Country &&
								Country.getAllCountries().map((item) => (
									<option key={item.isoCode} value={item.isoCode}>
										{item.name}
									</option>
								))}
						</select>
					</div>

					{address?.country && (
						<div className="auth__CountryState">
							<MdTransferWithinAStation />
							<select className="auth__countryState" defaultValue={address?.state} onBlur={(e) => setAddress({ ...address, state: e.target.value })}>
								{State &&
									State.getStatesOfCountry(address?.country).map((item) => (
										<option key={item.isoCode} value={item.isoCode}>
											{item.name}
										</option>
									))}
							</select>
						</div>
					)}
					<button className="auth__button" onClick={onContinue}>
						Continue
					</button>
				</div>
			</div>
		</>
	);
};

export default Shipping;
