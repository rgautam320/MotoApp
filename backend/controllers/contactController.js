import Catch from "../middleware/catch.js";
import ErrorHandler from "../middleware/error.js";
import sendEmail from "../utils/sendEmail.js";

// Send Response
export const contactUs = Catch(async (req, res, next) => {
	const { fullname, email, phone, message } = req.body;
	const response = `Your message has been received. We'll respond as soon as possible. \n\n MotoApp`;
	try {
		await sendEmail({
			email: "nothing3669@gmail.com",
			subject: `${fullname} has sent a message.`,
			message: `${message} \n\n Phone: ${phone}`,
		});
		await sendEmail({
			email: email,
			subject: fullname,
			message: response,
		});
		res.status(200).json({ success: true, message: `Email sent successfully.` });
	} catch (error) {
		return next(new ErrorHandler(500, error));
	}
});
