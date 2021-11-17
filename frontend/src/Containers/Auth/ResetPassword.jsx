import React, { useEffect, useState } from "react";
import { Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";
import { SmallLoader } from "../../Utils/Loader";
import { resetPassword, userActions } from "../../Data/reducers/user.reducer";

const ResetPassword = ({ match }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const { token } = match.params;

	const { error, isUpdated, loading, success } = useSelector((state) => state.user);

	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [passwords, setPasswords] = useState({
		password: "",
		confirmPassword: "",
	});

	const onUpdateChange = (e) => {
		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const onUpdatePassword = (e) => {
		e.preventDefault();
		const payload = {
			token,
			passwords,
		};
		if (passwords.password && passwords.confirmPassword) {
			if (passwords.password === passwords.confirmPassword) {
				if (passwords.password.length < 8 || passwords.confirmPassword.length < 8) {
					alert.error("Password can't be less than 8 characters.");
				} else {
					dispatch(resetPassword(payload));
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
			if (isUpdated && success) {
				history.push("/profile");
				alert.success(success);
				dispatch(userActions.reset());
			}
		}
	}, [alert, error, dispatch, history, isUpdated]);

	return (
		<>
			<MetaData title="Moto App | Auth" />
			<div className="container my-5 auth">
				<h1 className="heading auth__heading">Reset Password</h1>
				<div className="auth__box auth__box__medium">
					<form noValidate autoComplete="off" onSubmit={onUpdatePassword}>
						<div className="auth__input">
							<Input name="password" label="New Password" value={passwords.password} icon={<Lock />} type={showPassword1 ? "text" : "password"} handleShowPassword={() => setShowPassword1(!showPassword1)} handleChange={onUpdateChange} />
						</div>
						<div className="auth__input">
							<Input
								name="confirmPassword"
								label="Confirm Password"
								value={passwords.confirmPassword}
								icon={<Lock />}
								type={showPassword2 ? "text" : "password"}
								handleShowPassword={() => setShowPassword2(!showPassword2)}
								handleChange={onUpdateChange}
							/>
						</div>
						{loading ? (
							<SmallLoader />
						) : (
							<button type="submit" className="auth__button">
								Change Password
							</button>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
