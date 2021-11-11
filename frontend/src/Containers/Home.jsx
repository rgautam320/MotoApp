import React from "react";
import Hero from "../Components/Home/Hero";
import { Helmet } from "react-helmet";
import Featured from "../Components/Home/Featured";

const Home = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Home</title>
				<meta name="description" content="Moto App - Home Page" />
			</Helmet>
			<div className="home">
				<Hero />
				<Featured />
			</div>
		</>
	);
};

export default Home;
