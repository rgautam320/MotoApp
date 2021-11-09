import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - About</title>
				<meta name="description" content="Moto App - About Page" />
			</Helmet>
			<div className="container">
				<div className="about_about">
					<h1 className="text-center">About</h1>
				</div>
			</div>
		</>
	);
};

export default About;
