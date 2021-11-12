import React from "react";
import { CgMouse } from "react-icons/all";

const Hero = () => {
	return (
		<>
			<section id="hero">
				<div className="hero__hero">
					<h3 className="sub-heading hero__h3">Welcome to Moto Shop</h3>
					<h1 className="sub-heading hero__h1">Find Amazing Products Here</h1>
					<a href="#featured">
						<button className="hero__button">
							Scroll <CgMouse />
						</button>
					</a>
				</div>
			</section>
		</>
	);
};

export default Hero;
