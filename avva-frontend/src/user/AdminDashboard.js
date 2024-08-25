import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const { user: { name, email, role } } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
                <h4>Admin links</h4>
                <ul>
                    <li>
                        <Link to="/create/category">Create category</Link>
                    </li>
                    <li>
                        <Link to="/create/product">Create product</Link>
                    </li>
                </ul>

            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div>
                <h3>Admin Information</h3>
                name: {name}
                email: {email}
                role: {role === 1 ? 'Admin' : 'Registered User'}
            </div>
        )
    }

    return (
        <Layout>
            <div className="row">
                {adminLinks()}
                {adminInfo()}
            </div>
        </Layout>
    )
}


export default AdminDashboard;