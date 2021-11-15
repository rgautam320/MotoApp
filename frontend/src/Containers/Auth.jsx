import React, { useEffect, useState } from "react";
import MetaData from "../HOCS/MetaData";
import { AccountCircle, EmailRounded, Lock } from "@material-ui/icons";
import Input from "../Components/Auth/Input";

const Auth = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [avatar, setAvatar] = useState("/logo.png");
	const [avatarPreview, setAvatarPreview] = useState("/logo.png");

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onLoginChange = (e) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const onLogin = (e) => {
		e.preventDefault();
		console.log(loginData);
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		console.log(user);
		console.log(avatar);
	};

	const registerDataChange = (e) => {
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
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<MetaData title="Moto App | Auth" />
			<div className="container my-5">
				<div className="auth__auth">
					<div className="d-flex justify-content-around">
						<button onClick={() => setIsLogin(true)} className={`auth__toggle ${isLogin ? "auth__true" : ""}`}>
							Login
						</button>
						<button onClick={() => setIsLogin(false)} className={`auth__toggle ${!isLogin ? "auth__true" : ""}`}>
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
									<Input name="password" label="Password" value={loginData.password} icon={<Lock />} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={onLoginChange} />
								</div>
								<div className="auth__forgot">
									Forgot Password? &nbsp; <button onClick={() => setIsLogin(false)}>Reset</button>
								</div>

								<div className="auth__forgot">
									Don't have an account? &nbsp; <button onClick={() => setIsLogin(false)}> Signup</button>
								</div>
								<button type="submit" className="auth__button">
									Login
								</button>
							</form>
						</>
					) : (
						<>
							<form noValidate autoComplete="off" onSubmit={registerSubmit}>
								<div className="auth__input">
									<Input name="email" type="email" label="Email" value={user.email} icon={<EmailRounded />} handleChange={registerDataChange} />
								</div>
								<div className="auth__input">
									<Input name="name" type="text" label="Name" value={user.name} icon={<AccountCircle />} handleChange={registerDataChange} />
								</div>
								<div className="auth__input">
									<Input
										name="password"
										label="Password"
										value={user.password}
										icon={<Lock />}
										handleChange={registerDataChange}
										type={showPassword ? "text" : "password"}
										handleShowPassword={handleShowPassword}
										handleChange={onLoginChange}
									/>
								</div>
								<div className="auth__registerImage">
									<img src={avatarPreview} alt="Avatar Preview" />
									<input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
								</div>
								<button type="submit" className="auth__button">
									Signup
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Auth;
