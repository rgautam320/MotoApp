import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";

import Logo from "../../Assets/logo.png";

const Footer = () => {
	return (
		<>
			<div className="footer__footer">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-sm-4 col-12">
							<center>
								<img src={Logo} alt="Logo" className="footer__logo" />
							</center>
						</div>
						<div className="col-md-4 col-sm-4 col-12">
							<h4 className="text-center py-3 footer__title">Moto App</h4>
							<h6 className="text-center py-2 my-0">
								Copyright &copy;{" "}
								<a className="text-light" href="https://rajangautam.com.np">
									Rajan Gautam
								</a>
							</h6>
						</div>
						<div className="col-md-4 col-sm-4 col-12">
							<h4 className="text-center py-3 footer__title">Follow Us</h4>
							<center>
								<a className="footer__social" href="https://facebook.com/rgautam320">
									<BsFacebook /> &nbsp; <span className="text-light">Facebook</span>
								</a>
								<a className="footer__social" href="https://instagram.com/rgautam320">
									<BsInstagram /> &nbsp; <span className="text-light">Instagram</span>
								</a>
							</center>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
