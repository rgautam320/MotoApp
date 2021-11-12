import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Hero from "../Components/Home/Hero";
import Featured from "../Components/Home/Featured";
import MetaData from "../HOCS/MetaData";
import { getFeaturedProducts } from "../Data/reducers/product.reducer";

const Home = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, error, featuredProducts } = useSelector((state) => state.product);

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		dispatch(getFeaturedProducts());
	}, [dispatch, alert, error]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<MetaData title="Moto App | Home" />
			<div className="home">
				<Hero />
				<Featured products={featuredProducts} loading={loading} />
			</div>
		</>
	);
};

export default Home;
