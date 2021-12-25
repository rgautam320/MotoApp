import React from "react";
import { MdSpaceDashboard, MdOutlineImportExport, MdListAlt, BsPeopleFill, MdRateReview } from "react-icons/all";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/logo.png";

const Sidebar = () => {
	return (
		<div className="sidebar__fixed">
			<div className="sidebar__sidebar">
				<div className="container">
					<div className="sidebar__logo">
						<img src={Logo} alt="App Logo" />
						<h3 className="sidebar__logo__text">MotoApp</h3>
					</div>
					<hr />
					<div className="sidebar__linkBox">
						<NavLink exact to="/admin/dashboard" className="sidebar__linkBox__links" activeClassName="sidebar__linkBox__active">
							<MdSpaceDashboard /> Dashboard
						</NavLink>
					</div>
					<div className="sidebar__linkBox">
						<NavLink exact to="/admin/dashboard/products" className="sidebar__linkBox__links" activeClassName="sidebar__linkBox__active">
							<MdOutlineImportExport /> Products
						</NavLink>
					</div>
					<div className="sidebar__linkBox">
						<NavLink exact to="/admin/dashboard/orders" className="sidebar__linkBox__links" activeClassName="sidebar__linkBox__active">
							<MdListAlt /> Orders
						</NavLink>
					</div>
					<div className="sidebar__linkBox">
						<NavLink exact to="/admin/dashboard/users" className="sidebar__linkBox__links" activeClassName="sidebar__linkBox__active">
							<BsPeopleFill /> Users
						</NavLink>
					</div>
					<div className="sidebar__linkBox">
						<NavLink exact to="/admin/dashboard/reviews" className="sidebar__linkBox__links" activeClassName="sidebar__linkBox__active">
							<MdRateReview /> Reviews
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
