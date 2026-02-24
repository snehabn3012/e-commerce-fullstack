import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useIsAdmin,
  useIsRegisteredUser,
  useIsAuthenticated,
  useUserData,
} from "../hooks/useAuth";
import { signout } from "../auth";
import "./Navbar.css";

function Navbar() {
  let navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const isUser = useIsRegisteredUser();
  const isAuthenticated = useIsAuthenticated();
  const { user } = useUserData();
  const _id = user?._id;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">E commerce application</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">All Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>

          {isUser && (
            <li>
              <Link to="/user/dashboard">User Dashboard</Link>
            </li>
          )}

          <li className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-btn">
              {/* <img
                className="avatar"
                src=""
                alt="Profile"
              /> */}
              My Account
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to={`/profile/${_id}`}>My Profile</Link>
                <Link to="/purchase-history">Purchase History</Link>

                {isAuthenticated ? (
                  <span
                    className="dropdown-item"
                    onClick={() => {
                      signout(() => {
                        navigate("/");
                      });
                    }}
                  >
                    Sign Out
                  </span>
                ) : (
                  <>
                    <Link to="/signin">Sign In</Link>
                    <Link to="/signup">Create Account / Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;