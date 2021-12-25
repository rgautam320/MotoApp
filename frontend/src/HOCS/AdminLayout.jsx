import React from "react";
import Sidebar from "../Components/Admin/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import AdminRoutes from "./AdminRoutes";
import MetaData from "./MetaData";

const AdminLayout = () => {
	return (
		<>
			<MetaData title="Moto App | Admin Dashboard" />
			<Navbar />
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12" style={{ paddingTop: "15vh" }}>
						<Sidebar />
					</div>
					<div className="col-xl-10 col-lg-9 col-md-9 col-sm-12 col-12">
						<AdminRoutes />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
