import React, { useState } from "react";
import { signInAPI, authenticate, isAuthenticated } from '../auth';
import { Navigate } from 'react-router-dom';
import Layout from "../core/Layout";

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const { email, password, loading, error, redirectToReferrer } = formData;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setFormData({
            ...formData,
            error: false,
            [name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, error: false, loading: true })
        signInAPI({ email, password }).then((data) => {
            if (data.error) {
                setFormData({ ...formData, error: data.error, loading: false })
            } else {

                authenticate(
                    data,
                    () => {
                        setFormData({
                            ...formData,
                            redirectToReferrer: true
                        })
                    }
                )
            }
        })
    }

    const showError = () => {
        return (
            <div className="alert" style={{ display: error ? '' : 'none' }}>
                {formData.error}
            </div>
        )
    }

    const showLoading = () => {
        return (
            <div className="alert" style={{ display: loading ? '' : 'none' }}>
                loading !!
            </div>
        )
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user?.role === 1) {
                <Navigate to="/admin/dashboard" />
            } else {
                <Navigate to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            <Navigate to="/" />
        }
    }

    return (
        <Layout>
            <div className="flex">
                <div className="w-3/4">
                    {JSON.stringify(formData)}
                </div>

                <div className="w-2/4 flex justify-center items-center min-h-screen bg-gray-100">
                    {showLoading()}
                    {showError()}
                    {redirectUser()}
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange('email')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleChange('password')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            SignIn
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SignIn;