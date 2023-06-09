import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../ReusableComponents/LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

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
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/add-recipe">
              Add Recipe
            </Link>

            <Link className="navLink" to="/shopping-list">
              Shopping List
            </Link>

            {/* Commented out as there is no content at this page currently */}
            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
        
        {/* Commented out as there is no content at this page currently */}
        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
