import React from "react";
import Hero from "../Components/Home/Hero";
import Featured from "../Components/Home/Featured";
import MetaData from "../HOCS/MetaData";

const Home = () => {
	return (
		<>
			<MetaData title="Moto App | Home" />
			<div className="home">
				<Hero />
				<Featured />
			</div>
		</>
	);
};

export default Home;
