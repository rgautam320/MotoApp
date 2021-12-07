import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Backdrop } from "@material-ui/core";

import { AiFillHome, AiOutlineMail, FaProductHunt, FaLock, AiFillInfoCircle } from "react-icons/all";
import Logo from "../../Assets/logo.png";

const Navbar = () => {
	const history = useHistory();

	const [open, setOpen] = useState(false);
	const { isAuthenticated } = useSelector((state) => state.user);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const actions = [
		{ icon: <AiFillHome />, name: "Home", func: home },
		{ icon: <FaProductHunt />, name: "Products", func: products },
		{ icon: <AiOutlineMail />, name: "Contact", func: contact },
		{ icon: <AiFillInfoCircle />, name: "About", func: about },
	];
	if (!isAuthenticated) {
		actions.push({ icon: <FaLock />, name: "Login", func: auth });
	}
	function home() {
		history.push("/");
		handleClose();
	}
	function products() {
		history.push("/products");
		handleClose();
	}
	function contact() {
		history.push("/contact");
		handleClose();
	}
	function about() {
		history.push("/about");
		handleClose();
	}
	function auth() {
		history.push("/auth");
		handleClose();
	}
	return (
		<>
			<div className="navbar__options">
				<Backdrop open={open ? open : false} />
				<SpeedDial ariaLabel="SpeedDial" direction="down" icon={<img className="navbar__speedDialIcon" src={Logo} alt="Profile" />} onOpen={handleOpen} onClose={handleClose} open={open ? open : false}>
					{actions.map((action) => (
						<SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.func} />
					))}
				</SpeedDial>
			</div>
		</>
	);
};

export default Navbar;
