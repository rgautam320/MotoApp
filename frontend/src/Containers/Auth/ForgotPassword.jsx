import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";
import { forgotPassword, userActions } from "../../Data/reducers/user.reducer";
import { SmallLoader } from "../../Utils/Loader";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const { error, isUpdated, success, loading } = useSelector((state) => state.user);

	const [email, setEmail] = useState("");

	const onSubmitEmail = (e) => {
		e.preventDefault();
		if (email) {
			dispatch(forgotPassword(email));
		} else {
			alert.error("Email is Mandatory.");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (error) {
			alert.error(error);
		} else if (isUpdated && success) {
			alert.success(success);
		}
		dispatch(userActions.reset());
	}, [alert, error, dispatch, history, isUpdated, success]);

	return (
		<>
			<MetaData title="Moto App | Forgot Password" />
			<div className="container my-5 forgotPassword">
				<h1 className="heading forgotPassword__heading">Forgot Password</h1>
				<div className="forgotPassword__box">
					<form noValidate autoComplete="off" onSubmit={onSubmitEmail}>
						<div className="forgotPassword__input">
							<Input name="email" type="email" label="Email" value={email} icon={<MdEmail />} handleChange={(e) => setEmail(e.target.value)} />
						</div>
						{loading ? (
							<SmallLoader />
						) : (
							<button type="submit" className="forgotPassword__button">
								Forgot Password
							</button>
						)}
					</form>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
