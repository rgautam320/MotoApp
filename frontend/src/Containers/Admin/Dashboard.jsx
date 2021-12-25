import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

const Dashboard = () => {
	const lineState = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "TOTAL AMOUNT",
				backgroundColor: ["tomato"],
				hoverBackgroundColor: ["rgb(197, 72, 49)"],
				data: [0, 4000],
			},
		],
	};
	const doughnutState = {
		labels: ["Out of Stock", "InStock"],
		datasets: [
			{
				backgroundColor: ["#00A6B4", "#6800B4"],
				hoverBackgroundColor: ["#4B5000", "#35014F"],
				data: [2, 10],
			},
		],
	};

	return (
		<>
			<div className="container adminDashboard__dashboard">
				<h1 className="heading adminDashboard__heading">Admin Dashboard</h1>

				<div className="adminDashboard__circles">
					<NavLink exact to="/admin/dashboard/products" className="adminDashboard__circles__links adminDashboard__circles__link1">
						<div className="adminDashboard__circles__links__details">
							<span>Products</span>
							<span>{10}</span>
						</div>
					</NavLink>
					<NavLink exact to="/admin/dashboard/orders" className="adminDashboard__circles__links adminDashboard__circles__link2">
						<div className="adminDashboard__circles__links__details">
							<span>Orders</span>
							<span>{10}</span>
						</div>
					</NavLink>
					<NavLink exact to="/admin/dashboard/users" className="adminDashboard__circles__links adminDashboard__circles__link3">
						<div className="adminDashboard__circles__links__details">
							<span>Users</span>
							<span>{10}</span>
						</div>
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
