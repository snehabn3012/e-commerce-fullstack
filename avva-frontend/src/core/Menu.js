import React from "react";
import { Link, useNavigate } from 'react-router-dom';

import { signout } from "../auth";

// import { Button, ButtonGroup } from '@chakra-ui/react'

function Menu() {
    let navigate = useNavigate();




    return (
        <div>
            <button className="btn">
                <Link to="/"> Home</Link>
            </button>
            <button className="btn">
                <Link to="/signin"> SignIn</Link>
            </button>
            <button className="btn" >
                <Link to="/signup"> SignUp</Link>
            </button>
            <button className="btn bg-red-500">
                <span onClick={
                    () => {
                        signout(() => {
                            navigate("/");
                        })
                    }}> SignOut</span>
            </button>
        </div>
    )
}

export default Menu;