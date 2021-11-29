import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";

import { updateProfile, userActions } from "../../Data/reducers/user.reducer";

import { MdEmail, MdAccountCircle } from "react-icons/md";
import { MdPinDrop, MdPublic, MdTransferWithinAStation } from "react-icons/md";
import { BiStreetView } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";

const Auth = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const { isUpdated, error, user, success, cart } = useSelector((state) => state.user);

	const [avatar, setAvatar] = useState(user?.avatar?.url);
	const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url);

	const [userInfo, setUserInfo] = useState({
		name: user?.name,
		email: user?.email,
	});
	const [address, setAddress] = useState({
		street: user?.address?.street,
		city: user?.address?.city,
		zip: user?.address?.zip,
		country: user?.address?.country,
		state: user?.address?.state,
		phone: user?.address?.phone,
	});

	const onUpdateChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
		}
	};

	const onAddressChange = (e) => {
		setAddress({ ...address, [e.target.name]: e.target.value });
	};

	const onUpdateProfile = (e) => {
		e.preventDefault();
		const payload = {
			email: userInfo.email,
			name: userInfo.name,
			address: address,
			avatar: { public_id: user?.avatar?.public_id, url: avatar },
			cart: cart,
		};
		if (payload.email && payload.name && payload.avatar) {
			dispatch(updateProfile(payload));
		} else {
			alert.error("Email, Name, Avatar are mandatory fields.");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else {
			if (isUpdated && success) {
				alert.success(success);
				history.push("/profile");
				dispatch(userActions.reset());
			}
		}
		setUserInfo({
			name: user?.name,
			email: user?.email,
		});
	}, [alert, error, user, dispatch, history, isUpdated, success]);

	return (
		<>
			<MetaData title="Moto App | Auth" />
			<div className="container my-5 auth">
				<h1 className="heading auth__heading">Update Profile</h1>
				<div className="auth__box auth__box__updateBox">
					<form noValidate autoComplete="off" onSubmit={onUpdateProfile}>
						<div className="row">
							<div className="col-md-6 col-12">
								<h1 className="sub-heading auth__subheading">User Info</h1>
								<hr />
								<div className="auth__input">
									<Input name="email" type="email" label="Email" value={userInfo.email} icon={<MdEmail />} handleChange={onUpdateChange} />
								</div>
								<div className="auth__input">
									<Input name="name" type="text" label="Name" value={userInfo.name} icon={<MdAccountCircle />} handleChange={onUpdateChange} />
								</div>
								<div className="auth__registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input type="file" name="avatar" accept="image/*" onChange={onUpdateChange} />
								</div>
							</div>
							<div className="col-md-6 col-12">
								<h1 className="sub-heading auth__subheading">Address Details</h1>
								<hr />
								<div className="auth__input">
									<Input name="street" type="text" label="Street" value={address?.street} icon={<BiStreetView />} handleChange={onAddressChange} />
								</div>
								<div className="auth__input">
									<Input name="city" type="text" label="City" value={address?.city} icon={<FaCity />} handleChange={onAddressChange} />
								</div>
								<div className="auth__input">
									<Input name="zip" type="text" label="Zip Code" value={address?.zip} icon={<MdPinDrop />} handleChange={onAddressChange} />
								</div>
								<div className="auth__input">
									<Input name="phone" type="text" label="Phone Number" value={address?.phone} icon={<AiFillPhone />} handleChange={onAddressChange} />
								</div>

								<div className="auth__CountryState">
									<MdPublic />
									<select className="auth__countryState" defaultValue={address?.country} onBlur={(e) => setAddress({ ...address, country: e.target.value })}>
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
							</div>
						</div>

						<button type="submit" className="auth__button">
							Update
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Auth;
