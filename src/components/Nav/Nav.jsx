import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../ReusableComponents/LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
	const user = useSelector((store) => store.user);
	const newUserWalkThroughStep = useSelector(
		(store) => store.newUserWalkThroughStep
	);

	const showNewUserClasses = "navLink newUserOutline";
	const navLinkClass = "navLink";

	const homeClasses =
		newUserWalkThroughStep === 1
			? showNewUserClasses
			: navLinkClass;

	const addRecipeClasses =
		newUserWalkThroughStep === 2
			? showNewUserClasses
			: navLinkClass;

	const shoppingListClasses =
		newUserWalkThroughStep === 3
			? showNewUserClasses
			: navLinkClass;

	const userClasses =
		newUserWalkThroughStep === 4
			? showNewUserClasses
			: navLinkClass;

	return (
		<div className="nav">
			<Link to="/home">
				<h2 className="nav-title">EZEats</h2>
			</Link>
			<div>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<Link className="navLink" to="/login">
						Login / Register
					</Link>
				)}

				{/* If a user is logged in, show these links */}
				{user.id && (
					<>
						<Link className={homeClasses} to="/home">
							Home
						</Link>

						<Link
							className={addRecipeClasses}
							to="/add-recipe"
						>
							Add Recipe
						</Link>

						<Link
							className={shoppingListClasses}
							to="/shopping-list"
						>
							Shopping List
						</Link>

						<Link className={userClasses} to="/user">
							User
						</Link>

						<LogOutButton className="navLink" />
					</>
				)}
			</div>
		</div>
	);
}

export default Nav;
