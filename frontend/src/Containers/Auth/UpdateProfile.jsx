import React, { useEffect, useState } from "react";
import { AccountCircle, EmailRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";
import { updateProfile, userActions } from "../../Data/reducers/user.reducer";

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
	console.log(cart);

	const onUpdateProfile = (e) => {
		e.preventDefault();
		const payload = {
			email: userInfo.email,
			name: userInfo.name,
			address: user?.address,
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
				<div className="auth__box">
					<form noValidate autoComplete="off" onSubmit={onUpdateProfile}>
						<div className="auth__input">
							<Input name="email" type="email" label="Email" value={userInfo.email} icon={<EmailRounded />} handleChange={onUpdateChange} />
						</div>
						<div className="auth__input">
							<Input name="name" type="text" label="Name" value={userInfo.name} icon={<AccountCircle />} handleChange={onUpdateChange} />
						</div>
						<div className="auth__registerImage">
							<img src={avatarPreview} alt="Avatar Preview" />
							<input type="file" name="avatar" accept="image/*" onChange={onUpdateChange} />
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