import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from 'react-router-dom';

function Dashboard() {
    const { user: { name, email, role } } = isAuthenticated();

    const userLinks = () => {
        return (
            <div>
                <h4>User links</h4>
                <ul>
                    <li>
                        <Link to="/cart">My Cart</Link>
                    </li>
                    <li>
                        <Link to="/profile/update">Update Profile</Link>
                    </li>
                </ul>

            </div>
        )
    }

    const userInfo = () => {
        return (
            <div>
                <h3>User Information</h3>
                name: {name}
                email: {email}
                role: {role === 1 ? 'Admin' : 'Registered User'}
            </div>
        )
    }

    const history = () => {
        return (
            <div className="history">
                <h2>history</h2>
            </div>
        )
    }
    return (
        <Layout>
            <div className="row">
                {userLinks()}
                {userInfo()}
                {history()}
            </div>
        </Layout>
    )
}

export default Dashboard;