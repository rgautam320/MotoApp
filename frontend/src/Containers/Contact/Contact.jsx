import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../../HOCS/MetaData";
import { contactActions, sendMessage } from "../../Data/reducers/contact.reducer";

import { AiOutlinePhone, AiOutlineMail, HiOutlineLocationMarker } from "react-icons/all";

const Contact = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, success } = useSelector((state) => state.contact);

    const [info, setInfo] = useState({
        fullname: "",
        email: "",
        phone: "",
        message: "",
    });

    const onChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const onSubmit = () => {
        if (!info.fullname && !info.email && !info.phone && !info.message) {
            alert.error("All the fields are required.");
            return;
        }
        dispatch(sendMessage(info));
    };

    useEffect(() => {
        if (success) {
            alert.success(success);
            setInfo({
                fullname: "",
                email: "",
                phone: "",
                message: "",
            });
        } else if (error) {
            alert.error(error);
        }
        dispatch(contactActions.reset());
    }, [alert, success, error, dispatch]);
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
                                    <input
                                        type="text"
                                        name="fullname"
                                        placeholder="Full Name"
                                        value={info.fullname}
                                        onChange={onChange}
                                        className="contact__box__form__group__input"
                                        required
                                    />
                                </div>
                                <div className="form-group contact__box__form__group">
                                    <label htmlFor="email">
                                        Email <span>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={info.email}
                                        onChange={onChange}
                                        className="contact__box__form__group__input"
                                        required
                                    />
                                </div>
                                <div className="form-group contact__box__form__group">
                                    <label htmlFor="phone">
                                        Phone Number <span>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={info.phone}
                                        onChange={onChange}
                                        className="contact__box__form__group__input"
                                        required
                                        maxLength="10"
                                    />
                                </div>
                                <div className="form-group contact__box__form__group">
                                    <label htmlFor="message">
                                        Message <span>*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="Enter Your Message"
                                        value={info.message}
                                        onChange={onChange}
                                        className="contact__box__form__group__input"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div className="contact__box__form__group d-flex justify-content-center">
                                    <button className="contact__box__form__group__btn" onClick={onSubmit}>
                                        Send Message
                                    </button>
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
