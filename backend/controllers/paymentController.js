import dotenv from "dotenv";
import stripeImport from "stripe";
import Catch from "../middleware/catch.js";

// Initializing config file
dotenv.config();
const stripe = stripeImport(process.env.STRIPE_SECRET_KEY);

export const processPayment = Catch(async (req, res, next) => {
	console.log(req.body);
	const payment = await stripe.paymentIntents.create({
		amount: req.body.amount,
		currency: "inr",
		metadata: {
			company: "MotoApp",
		},
	});
	res.status(200).json({ success: true, client_secret: payment.client_secret });
});

export const sendStripeApiKey = Catch(async (req, res, next) => {
	res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
