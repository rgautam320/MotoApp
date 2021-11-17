import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Profile = () => {
	const { user } = useSelector((state) => state.user);

	return (
		<div className="container my-5 profile">
			<h1 className="heading profile__heading">Profile</h1>

			<div className="row py-3">
				<div className="col-md-6 col-12 mx-auto">
					<div className="profile__imageBox my-3">
						<div className="d-flex justify-content-center">
							<img src={user?.avatar?.url} alt={user?.name} />
						</div>
						<div className="d-flex justify-content-center">
							<NavLink className="profile__updateButton" to="/profile/update">
								Update Profile
							</NavLink>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-12 mx-auto">
					<div className="profile__details">
						<div className="profile__info">
							<h4>Name:</h4>
							<p>{user?.name}</p>
						</div>
						<div className="profile__info">
							<h4>Email:</h4>
							<p>{user?.email}</p>
						</div>
						<div className="profile__info">
							<h4>User Since:</h4>
							<p>{user?.createdAt?.substr(0, 10)}</p>
						</div>
						<div className="d-flex justify-content-center">
							<NavLink to="/profile/change-password" className="profile__updateButton">
								Change Password
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
