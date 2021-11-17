import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Dashboard, Person, ExitToApp, ListAlt, ShoppingCart } from "@material-ui/icons";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { logout, userActions } from "../../Data/reducers/user.reducer";

const UserOptions = ({ user }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

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
			icon: <ShoppingCart />,
			name: `Cart`,
			func: cart,
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
	function cart() {
		history.push("/cart");
		handleClose();
	}
	function logoutUser() {
		dispatch(logout());
		handleClose();
	}

	return (
		<>
			<div className="user__options">
				<SpeedDial
					ariaLabel="SpeedDial"
					className="user__speedDial"
					direction="down"
					icon={<img className="user__speedDialIcon" src={user?.avatar?.url ? user?.avatar?.url : "/logo.png"} alt="Profile" />}
					onOpen={handleOpen}
					onClose={handleClose}
					open={open}
				>
					{actions.map((action) => (
						<SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.func} />
					))}
				</SpeedDial>
			</div>
		</>
	);
};

export default UserOptions;
