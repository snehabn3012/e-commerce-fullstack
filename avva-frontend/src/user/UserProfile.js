import React, { useState, useEffect, useCallback } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { useParams, Navigate } from "react-router-dom";
import { getUser, update, updateUser } from "../api/user";


const UserProfile = ({ user = {} }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        success: false
    });

    const { userId } = useParams();

    const { name, email, password, error, success } = values;

    const init = useCallback(userId => {
        // console.log(userId);
        getUser(userId).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    }, [userId])

    useEffect(() => {
        if (userId) {
            init(userId);
        }
    }, [userId, init]);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update({ name, email, password }).then(
            data => {
                if (data.error) {
                    console.lgo(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Navigate to="/cart" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control"
                    value={password}
                />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile"
            className="container-fluid"
        >
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};

export default UserProfile;
