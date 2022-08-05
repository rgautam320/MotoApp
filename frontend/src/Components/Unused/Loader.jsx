import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { useSelector } from "react-redux";

export const Loader = () => {
	const { loading } = useSelector((state) => state.user);
	return (
		<>
			<Backdrop open={loading} style={{ zIndex: "10" }} />
			<div className="loader__loader">
				<div className="loader__innerLoader"></div>
			</div>
		</>
	);
};

export const SmallLoader = () => {
	return (
		<div className="smallLoader__loader">
			<div className="smallLoader__innerLoader"></div>
		</div>
	);
};
