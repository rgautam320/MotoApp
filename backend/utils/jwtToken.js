// Creating function to create and store token in cookie

const sendToken = (user, status, res) => {
	const token = user.getJWTToken();

	// Options for cookie
	const options = {
		expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 86400 * 1000),
		httpOnly: true,
	};

	res.status(status).cookie("token", token, options).json({ success: true, message: "Logged in Successfully.", token: token, user: user });
};

export default sendToken;
