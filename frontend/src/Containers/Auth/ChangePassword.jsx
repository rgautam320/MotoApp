import React, { useEffect, useState } from "react";
import { Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Auth/Input";
import { changePassword, userActions } from "../../Data/reducers/user.reducer";

const ChangePassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const { isAuthenticated, error, isUpdated } = useSelector((state) => state.user);

	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [showPassword3, setShowPassword3] = useState(false);

	const [passwords, setPasswords] = useState({
		oldPassword: "",
		password: "",
		confirmPassword: "",
	});

	const onUpdateChange = (e) => {
		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const onUpdatePassword = (e) => {
		e.preventDefault();
		const payload = {
			oldPassword: passwords.oldPassword,
			newPassword: passwords.password,
			confirmNewPassword: passwords.confirmPassword,
		};
		if (payload.oldPassword && payload.newPassword && payload.confirmNewPassword) {
			if (payload.newPassword === payload.confirmNewPassword) {
				if (payload.newPassword.length < 8 || payload.confirmNewPassword.length < 8 || payload.oldPassword.length < 8) {
					alert.error("Password can't be less than 8 characters.");
				} else {
					dispatch(changePassword(payload));
				}
			} else {
				alert.error("Passwords don't match");
			}
		} else {
			alert.error("All fields are mandatory");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else {
			if (isUpdated) {
				history.push("/profile");
				alert.success("Password Changed Successfully.");
				dispatch(userActions.reset());
			}
		}
	}, [alert, error, isAuthenticated, dispatch, history, isUpdated]);

	return (
		<>
			<MetaData title="Moto App | Auth" />
			<div className="container my-5 changePassword">
				<h1 className="heading profile__heading">Update Profile</h1>
				<div className="changePassword__changePassword">
					<form noValidate autoComplete="off" onSubmit={onUpdatePassword}>
						<div className="auth__input">
							<Input
								name="oldPassword"
								label="Old Password"
								value={passwords.oldPassword}
								icon={<Lock />}
								type={showPassword1 ? "text" : "password"}
								handleShowPassword={() => setShowPassword1(!showPassword1)}
								handleChange={onUpdateChange}
							/>
						</div>
						<div className="auth__input">
							<Input name="password" label="New Password" value={passwords.password} icon={<Lock />} type={showPassword2 ? "text" : "password"} handleShowPassword={() => setShowPassword2(!showPassword2)} handleChange={onUpdateChange} />
						</div>
						<div className="auth__input">
							<Input
								name="confirmPassword"
								label="Confirm Password"
								value={passwords.confirmPassword}
								icon={<Lock />}
								type={showPassword3 ? "text" : "password"}
								handleShowPassword={() => setShowPassword3(!showPassword3)}
								handleChange={onUpdateChange}
							/>
						</div>
						<button type="submit" className="changePassword__button">
							Change Password
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
