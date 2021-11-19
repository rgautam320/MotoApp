import React, { useState } from "react";
import { CgMouse, FaSearch } from "react-icons/all";
import { NavLink } from "react-router-dom";

const Hero = () => {
	const [keyword, setKeyword] = useState("");
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
					<div className="d-flex hero__searchBox mt-5">
						<input className="products__search hero__search" type="text" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
						<NavLink to={`/products?search=${keyword}`} className="hero__button hero__button__search">
							<FaSearch />
						</NavLink>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
