import React, { useEffect, useState } from "react";
import { EmailRounded, Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";
import { userActions } from "../../Data/reducers/user.reducer";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const { error, isUpdated } = useSelector((state) => state.user);

	const [email, setEmail] = useState("");

	const onSubmitEmail = (e) => {
		e.preventDefault();
		if (email) {
			// Dispatch
		} else {
			alert.error("Email is Mandatory.");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else {
			if (isUpdated) {
				history.push("/profile");
				alert.success(`An Email has been sent to ${email}.`);
				dispatch(userActions.reset());
			}
		}
	}, [alert, error, dispatch, history, isUpdated]);

	return (
		<>
			<MetaData title="Moto App | Forgot Password" />
			<div className="container my-5 auth">
				<h1 className="heading auth__heading">Forgot Password</h1>
				<div className="auth__box auth__box__small">
					<form noValidate autoComplete="off" onSubmit={onSubmitEmail}>
						<div className="auth__input">
							<Input name="email" type="email" label="Email" value={email} icon={<EmailRounded />} handleChange={(e) => setEmail(e.target.value)} />
						</div>
						<button type="submit" className="auth__button">
							Forgot Password
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
