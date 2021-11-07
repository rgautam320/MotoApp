import mongoose from "mongoose";

const connectDatabase = () => {
	mongoose
		.connect(process.env.CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`Mongodb Connected with Server`);
		});
};

export default connectDatabase;
