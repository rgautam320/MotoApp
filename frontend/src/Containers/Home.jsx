import React from "react";
import Hero from "../Components/Hero/Hero";
import { Helmet } from "react-helmet";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Home</title>
				<meta name="description" content="Moto App - Home Page" />
			</Helmet>
			<div className="home__home">
				<Hero />
			</div>
		</>
	);
};

export default Home;
