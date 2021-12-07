import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Dashboard, Person, ExitToApp, ListAlt, ShoppingCart, RemoveShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Data/reducers/user.reducer";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const { cart } = useSelector((state) => state.user);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const actions = [
		{ icon: <ListAlt />, name: "Orders", func: orders },
		{ icon: <Person />, name: "Profile", func: account },
		{
			icon: cart?.length ? <ShoppingCart style={{ color: "tomato" }} /> : <RemoveShoppingCart />,
			name: `Cart (${cart?.length})`,
			func: cartFunc,
		},
		{ icon: <ExitToApp />, name: "Logout", func: logoutUser },
	];
	if (user?.role === "admin") {
		actions.unshift({
			icon: <Dashboard />,
			name: "Dashboard",
			func: dashboard,
		});
	}
	function dashboard() {
		history.push("/admin/dashboard");
		handleClose();
	}

	function orders() {
		history.push("/orders");
		handleClose();
	}
	function account() {
		history.push("/profile");
		handleClose();
	}
	function cartFunc() {
		history.push("/cart");
		handleClose();
	}
	function logoutUser() {
		dispatch(logout());
		handleClose();
	}

	return (
		<>
			<div className="userOptions__options">
				<Backdrop open={open ? open : false} />
				<SpeedDial
					ariaLabel="SpeedDial"
					direction="down"
					icon={<img className="userOptions__speedDialIcon" src={user?.avatar?.url ? user?.avatar?.url : "/logo.png"} alt="Profile" />}
					onOpen={handleOpen}
					onClose={handleClose}
					open={open ? open : false}
				>
					{actions.map((action) => (
						<SpeedDialAction key={action.name} tooltipOpen={window.innerWidth <= 600 ? true : false} icon={action.icon} tooltipTitle={action.name} onClick={action.func} />
					))}
				</SpeedDial>
			</div>
		</>
	);
};

export default UserOptions;
