import Catch from "../middleware/catch";

export const placeOrder = Catch(async (req, res, next) => {
	res.status(200).json({ message: "Working" });
});
