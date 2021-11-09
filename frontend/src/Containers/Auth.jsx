import React from "react";
import { Helmet } from "react-helmet";

const Auth = () => {
	return (
		<>
			<Helmet>
				<title>Moto App - Auth</title>
				<meta name="description" content="Moto App - Auth Page" />
			</Helmet>
			<div className="container">
				<div className="auth_auth">
					<h1 className="text-center">Auth</h1>
				</div>
			</div>
		</>
	);
};

export default Auth;
