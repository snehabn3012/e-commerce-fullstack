import React, { useState } from "react";
import { signUpAPI } from './../auth';
import Layout from "../core/Layout";

function SignUp() {
    const [formData, setFormData] = useState({
        name: 'a',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const handleChange = name => event => {
        setFormData({
            ...formData,
            error: false,
            [name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        signUpAPI({ name, email, password }).then((data) => {
            if (data.error) {
                setFormData({ ...formData, error: data.error, success: false })
            } else {
                setFormData({
                    ...formData,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    };

    const showError = () => {
        return (
            <div className="alert" style={{ display: formData.error ? '' : 'none' }}>
                {formData.error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert" style={{ display: formData.success ? '' : 'none' }}>
                New account is created. Please signin
            </div>
        )
    }
    return (
        <Layout>
            <div className="flex">
                <div className="w-3/4">
                    {JSON.stringify(formData)}
                </div>

                <div className="w-2/4 flex justify-center items-center min-h-screen bg-gray-100">
                    {showSuccess()}
                    {showError()}
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange('name')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
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
                                value={formData.password}
                                onChange={handleChange('password')}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp;