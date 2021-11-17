// Creating function to create and store token in cookie

const sendToken = (user, statusCode, res) => {
	const token = user.getJWTToken();

	// Options for cookie - Not Working as of now
	const options = {
		expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 86400 * 1000),
		httpOnly: true,
		secure: false,
	};

	res.status(statusCode).cookie("token", token, options).json({ success: true, message: "Logged in Successfully.", token: token, user: user });

	// res.status(statusCode).json({ success: true, message: "Logged in Successfully.", token: token, user: user });
};

export default sendToken;
