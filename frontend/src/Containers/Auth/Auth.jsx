import React, { useEffect, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import { login, register, userActions } from "../../Data/reducers/user.reducer";

import MetaData from "../../HOCS/MetaData";
import Input from "../../Components/Shared/Input";

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

    const { isAuthenticated, success, error, isUpdated } = useSelector((state) => state.user);

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
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
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
            history.push("/profile");
        }
        if (error) {
            alert.error(error);
        } else if (isUpdated && success) {
            alert.success(success);
        }
        dispatch(userActions.reset());
    }, [isAuthenticated, history, alert, error, success, dispatch, isUpdated]);

    return (
        <>
            <MetaData title="Moto App | Auth" />
            <div className="container my-5 auth">
                <h1 className="heading auth__heading">{isLogin ? "Login" : "Signup"}</h1>
                <div className={isLogin ? "auth__auth auth__box__login" : "auth__auth"}>
                    <div className="d-flex justify-content-around auth__toggleBox">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`auth__toggleBox__toggle ${isLogin ? "auth__toggleBox__true" : ""}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`auth__toggleBox__toggle ${!isLogin ? "auth__toggleBox__true" : ""}`}
                        >
                            Signup
                        </button>
                    </div>
                    {isLogin ? (
                        <>
                            <form noValidate autoComplete="off" onSubmit={onLogin}>
                                <div className="auth__input">
                                    <Input
                                        name="email"
                                        type="email"
                                        label="Email"
                                        defaultValue={loginData.email}
                                        icon={<RiAccountCircleFill />}
                                        handleChange={onLoginChange}
                                    />
                                </div>
                                <div className="auth__input">
                                    <Input
                                        name="password"
                                        label="Password"
                                        defaultValue={loginData.password}
                                        icon={<FaLock />}
                                        type={showPassword ? "text" : "password"}
                                        handleShowPassword={() => setShowPassword(!showPassword)}
                                        handleChange={onLoginChange}
                                    />
                                </div>
                                <div className="auth__forgot">
                                    Forgot Password? &nbsp;{" "}
                                    <NavLink exact to="/profile/forgot-password" onClick={() => setIsLogin(false)}>
                                        Reset
                                    </NavLink>
                                </div>

                                <div className="auth__forgot">
                                    Don't have an account? &nbsp;{" "}
                                    <button onClick={() => setIsLogin(false)}> Signup</button>
                                </div>

                                <button type="submit" className="auth__button">
                                    Login
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <form noValidate autoComplete="off" onSubmit={onRegister}>
                                <div className="auth__input">
                                    <Input
                                        name="email"
                                        type="email"
                                        label="Email"
                                        defaultValue={userInfo.email}
                                        icon={<MdEmail />}
                                        handleChange={onRegisterChange}
                                    />
                                </div>
                                <div className="auth__input">
                                    <Input
                                        name="name"
                                        type="text"
                                        label="Name"
                                        defaultValue={userInfo.name}
                                        icon={<RiAccountCircleFill />}
                                        handleChange={onRegisterChange}
                                    />
                                </div>
                                <div className="auth__input">
                                    <Input
                                        name="password"
                                        label="Password"
                                        defaultValue={userInfo.password}
                                        icon={<FaLock />}
                                        handleChange={onRegisterChange}
                                        type={showPassword ? "text" : "password"}
                                        handleShowPassword={() => setShowPassword(!showPassword)}
                                    />
                                </div>
                                <div className="auth__registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input type="file" name="avatar" accept="image/*" onChange={onRegisterChange} />
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
