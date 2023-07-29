import React from "react";
import LogOutButton from "../../ReusableComponents/LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

function UserPage() {
	const user = useSelector((store) => store.user);
	return (
		<div className="container">
			<h2>Welcome, {user.username}!</h2>
			<p>Looking for some initial recipes?</p>
			<p>Select all the recipes, you would like added.</p>
			<input type="radio"></input>
			<LogOutButton className="btn" />
		</div>
	);
}

export default UserPage;
