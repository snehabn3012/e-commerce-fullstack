import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { useUserData } from "./../hooks/useAuth";
import Layout from "../core/Layout";
import { createCategory } from '../api/admin';

function AddCategory() {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const { user, token } = useUserData();

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // make API Call
        createCategory(user._id, token, { name })
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setName('');
                    setError('');
                    setSuccess(true);
                }
            })
    }

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const showSuccess = () => {
        if (success) {

            return <h3>Successfully created!</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3>{error}</h3>
        }
    }

    const goBack = () => (
        <div>
            <Link to="/admin/dashboard">Back to Admin Dashboard</Link>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div>
                <label className="">Name</label>
                <input type="text" className="" onChange={handleChange} value={name} />
            </div>
            <button type="submit">Create Category</button>
        </form>
    )

    console.log("user", user, token);

    return (
        <Layout>
            {goBack()}
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
        </Layout>
    )
}

export default AddCategory;