import React from "react";
import MetaData from "../../HOCS/MetaData";

import { AiOutlinePhone, AiOutlineMail, HiOutlineLocationMarker } from "react-icons/all";

const Contact = () => {
	return (
		<>
			<MetaData title="Moto App | Contact" />
			<div className="container contact">
				<div className="contact__contact">
					<h1 className="heading contact__heading">Contact Us</h1>
					<h5 className="sub-heading contact__subheading">Any questions or remarks? Just write a message!</h5>
					<div className="contact__box row">
						<div className="col-lg-4 col-md-5 col-sm-6 col-12">
							<div className="contact__box__info">
								<h3>Contact Information</h3>
								<hr />
								<p>Fill up the form and our Team will get back to you within 24 hours. </p>
								<div className="contact__box__info__details">
									<AiOutlinePhone /> +977 9863615330
								</div>
								<div className="contact__box__info__details">
									<AiOutlineMail /> contact@motoapp.com
								</div>
								<div className="contact__box__info__details">
									<HiOutlineLocationMarker /> Taplejung, Province 1, Nepal
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-7 col-sm-6 col-12">
							<div className="contact__box__form">
								<div className="form-group contact__box__form__group">
									<label htmlFor="fullname">
										Full Name <span>*</span>
									</label>
									<input type="text" name="fullname" placeholder="Full Name" className="contact__box__form__group__input" required />
								</div>
								<div className="form-group contact__box__form__group">
									<label htmlFor="email">
										Email <span>*</span>
									</label>
									<input type="email" name="email" placeholder="Email" className="contact__box__form__group__input" required />
								</div>
								<div className="form-group contact__box__form__group">
									<label htmlFor="phone">
										Phone Number <span>*</span>
									</label>
									<input type="text" name="phone" placeholder="Phone Number" className="contact__box__form__group__input" required maxLength="10" />
								</div>
								<div className="form-group contact__box__form__group">
									<label htmlFor="message">
										Message <span>*</span>
									</label>
									<textarea name="message" placeholder="Enter Your Message" className="contact__box__form__group__input" rows="3" required />
								</div>
								<div className="form-group contact__box__form__group">
									<button className="contact__box__form__group__btn">Send Message</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;
