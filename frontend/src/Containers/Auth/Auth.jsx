import React, { useEffect, useState } from "react";
import { AccountCircle, EmailRounded, Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Auth/Input";
import { SmallLoader } from "../../Utils/Loader";
import { load, login, register } from "../../Data/reducers/user.reducer";

const Auth = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const alert = useAlert();

	const [isLogin, setIsLogin] = useState(true);
	const [avatar, setAvatar] = useState("/logo.png");
	const [avatarPreview, setAvatarPreview] = useState("/logo.png");

	const [showPassword, setShowPassword] = useState(false);

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { isAuthenticated, loading, success, error } = useSelector((state) => state.user);

	const onLoginChange = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const onLogin = (e) => {
		e.preventDefault();
		if (loginData.email && loginData.password) {
			dispatch(login(loginData));
		} else {
			alert.error("Email and Password are mandatory fields.");
		}
	};

	const onRegisterChange = (e) => {
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

	const onRegister = (e) => {
		e.preventDefault();
		const payload = {
			email: userInfo.email,
			name: userInfo.name,
			avatar: avatar,
			password: userInfo.password,
		};
		if (payload.email && payload.name && payload.password) {
			dispatch(register(payload));
		} else {
			alert.error("Email, Name, Password and Avatar are mandatory fields.");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		if (isAuthenticated) {
			history.push("/");
		}
		if (error) {
			alert.error(error);
		} else if (success) {
			alert.success(success);
			dispatch(load());
		}
	}, [isAuthenticated, history, alert, error, success]);

	return (
		<>
			<MetaData title="Moto App | Auth" />
			<div className="container my-5">
				<div className="auth__auth">
					<div className="d-flex justify-content-around auth__toggleBox">
						<button onClick={() => setIsLogin(true)} className={`auth__toggleBox__toggle ${isLogin ? "auth__toggleBox__true" : ""}`}>
							Login
						</button>
						<button onClick={() => setIsLogin(false)} className={`auth__toggleBox__toggle ${!isLogin ? "auth__toggleBox__true" : ""}`}>
							Signup
						</button>
					</div>
					{isLogin ? (
						<>
							<form noValidate autoComplete="off" onSubmit={onLogin}>
								<div className="auth__input">
									<Input name="email" type="email" label="Email" value={loginData.email} icon={<AccountCircle />} handleChange={onLoginChange} />
								</div>
								<div className="auth__input">
									<Input name="password" label="Password" value={loginData.password} icon={<Lock />} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword(!showPassword)} handleChange={onLoginChange} />
								</div>
								<div className="auth__forgot">
									Forgot Password? &nbsp; <button onClick={() => setIsLogin(false)}>Reset</button>
								</div>

								<div className="auth__forgot">
									Don't have an account? &nbsp; <button onClick={() => setIsLogin(false)}> Signup</button>
								</div>
								{loading ? (
									<center>
										<SmallLoader />
									</center>
								) : (
									<button type="submit" className="auth__button">
										Login
									</button>
								)}
							</form>
						</>
					) : (
						<>
							<form noValidate autoComplete="off" onSubmit={onRegister}>
								<div className="auth__input">
									<Input name="email" type="email" label="Email" value={userInfo.email} icon={<EmailRounded />} handleChange={onRegisterChange} />
								</div>
								<div className="auth__input">
									<Input name="name" type="text" label="Name" value={userInfo.name} icon={<AccountCircle />} handleChange={onRegisterChange} />
								</div>
								<div className="auth__input">
									<Input
										name="password"
										label="Password"
										value={userInfo.password}
										icon={<Lock />}
										handleChange={onRegisterChange}
										type={showPassword ? "text" : "password"}
										handleShowPassword={() => setShowPassword(!showPassword)}
									/>
								</div>
								<div className="auth__registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input type="file" name="avatar" accept="image/*" onChange={onRegisterChange} />
								</div>
								{loading ? (
									<center>
										<SmallLoader />
									</center>
								) : (
									<button type="submit" className="auth__button">
										Signup
									</button>
								)}
							</form>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Auth;
