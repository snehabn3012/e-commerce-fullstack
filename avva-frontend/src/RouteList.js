import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";
import ProtectedRoute from './auth/ProtectedRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const RouteList = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/user/dashboard' element={<UserDashboard />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/create/category' element={<AddCategory />} />
                    <Route path='/create/product' element={<AddProduct />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route path="/signin" exact element={<SignIn />} />
                <Route path="/signup" exact element={<SignUp />} />
            </Routes>
        </Router >
    )
}

export default RouteList;