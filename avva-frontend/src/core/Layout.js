import React from "react";
import Navbar from "./Navbar";

function Layout({ className, children }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout