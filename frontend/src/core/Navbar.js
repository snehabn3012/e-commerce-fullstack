
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    useIsAdmin, useIsRegisteredUser,
    useIsAuthenticated, useUserData
} from '../hooks/useAuth';

import { signout } from "../auth";

// import { Button, ButtonGroup } from '@chakra-ui/react'

function Navbar() {
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
        <nav class="border-gray-200 bg-gray-100 text-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
                    <span class="self-center text-2xl font-semibold whitespace-nowrap">Avva</span>
                </a>
                <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span class="sr-only">Open user menu</span>
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" /> */}
                    </button>

                    {/* <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> */}
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li className="btn">
                            <Link to="/"> Home</Link>
                        </li>
                        <li className="btn">
                            <Link to="/shop">All Products</Link>
                        </li>
                        <li className="btn">
                            <Link to="/cart">Cart</Link>
                        </li>
                        {
                            isUser && (<li className="btn" >
                                <Link to="/user/dashboard">User Dashboard</Link>
                            </li>
                            )
                        }
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center text-white focus:outline-none"
                            >
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
                                />
                                <span className="ml-2">My Account</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
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
                    </ul>
                </div>
            </div >
        </nav >
    )
}
export default Navbar;
