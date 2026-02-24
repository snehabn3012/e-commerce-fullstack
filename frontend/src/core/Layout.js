import React from "react";
import Navbar from "./Navbar";

function Layout({ className, children }) {
    return (
        <div>
            <div className="shadow-xl shadow-gray-500/50"><Navbar /></div>
            <div className="p-10">
                {children}
            </div>

        </div>
    )
}

export default Layout