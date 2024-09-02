import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    useIsAdmin, useIsRegisteredUser,
    useIsAuthenticated, useUserData
} from './../hooks/useAuth';
// import Search from './Search';

import { signout } from "../auth";

const Navbar = () => {
    let navigate = useNavigate();
    const isAdmin = useIsAdmin();

    const isUser = useIsRegisteredUser();
    const isAuthenticated = useIsAuthenticated();
    const { user: { _id } } = useUserData();


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    console.log("isAdmin", isAuthenticated);
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                className="h-8 w-auto"
                                src="/path-to-your-logo.png" // Replace with your logo path
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center justify-center space-x-8 ">

                        <Link
                            to="/"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            HOME
                        </Link>
                        <Link
                            to="/shop"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            ALL PRODUCTS
                        </Link>
                        <Link
                            to="/cart"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            CART
                        </Link>
                    </div>
                    <div>
                        {/* <Search /> */}
                    </div>
                    <div className="relative flex-shrink-0">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-gray-700 focus:outline-none"
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                            />
                            <span className="ml-2">My Account</span>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg shadow-gray-500/50 z-20">
                                <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    to={`/profile/${_id}`}>
                                    My Profile
                                </Link>
                                <Link
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    to={`/purchase-history`}>
                                    Purchase History
                                </Link>
                                {
                                    isAuthenticated && (
                                        <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        >
                                            <span onClick={
                                                () => {
                                                    signout(() => {
                                                        navigate("/");
                                                    })
                                                }}> SignOut</span>
                                        </li>)
                                }

                                {!isAuthenticated && (
                                    <>
                                        <li
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            <Link to="/signin">Sign In</Link>
                                        </li>

                                        <li className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                            <Link to="/signup">Create Account / Sign Up</Link>
                                        </li>
                                    </>)
                                }
                            </div>
                        )}
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <Link to="/search" className="text-gray-700 hover:text-gray-900">
                        {/* <FiSearch className="h-5 w-5" /> */}
                    </Link>
                    <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                        {/* <FiUser className="h-5 w-5" /> */}
                    </Link>
                    <Link to="/cart" className="text-gray-700 hover:text-gray-900">
                        {/* <FiShoppingCart className="h-5 w-5" /> */}
                    </Link>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
