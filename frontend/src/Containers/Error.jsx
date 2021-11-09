import React from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const Error = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Error</title>
				<meta name="description" content="Moto App - Error Page" />
			</Helmet>
			<div className="container">
				<h1 className="text-center error__class_404 py-3">404</h1>
				<h2 className="text-center error__class_oops error__class_404 py-3">
					<span className="error_res_oops">OOPS!</span> PAGE NOT FOUND
				</h2>
				<h5 className="text-center py-3">Sorry, the page you're looking for doesn't exist. Please check the URL.</h5>
				<NavLink exact activeClassName="error__my_active" className="nav-item error__link_item" to="/">
					<h1 className="text-center mt-5">
						<button type="button" className="btn my-3 error__getbackbtn">
							Get Back to Home Page
						</button>
					</h1>
				</NavLink>
			</div>
		</>
	);
};

export default Error;
