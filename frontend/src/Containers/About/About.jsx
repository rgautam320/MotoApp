import React from "react";
import MetaData from "../../HOCS/MetaData";

const About = () => {
	return (
		<>
			<MetaData title="Moto App | About" />
			<div className="container about">
				<div className="about__about">
					<h1 className="heading about__heading">About</h1>
				</div>
			</div>
		</>
	);
};

export default About;
