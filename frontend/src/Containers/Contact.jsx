import React from "react";
import { Helmet } from "react-helmet";

const Contact = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Contact</title>
				<meta name="description" content="Moto App - Contact Page" />
			</Helmet>
			<div className="container">
				<div className="contact_contact">
					<h1 className="text-center">Contact</h1>
				</div>
			</div>
		</>
	);
};

export default Contact;
