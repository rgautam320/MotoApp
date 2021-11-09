import React from "react";
import { Helmet } from "react-helmet";

const Search = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Search</title>
				<meta name="description" content="Moto App - Search Page" />
			</Helmet>
			<div className="container">
				<div className="search_search">
					<h1 className="text-center">Search</h1>
				</div>
			</div>
		</>
	);
};

export default Search;
