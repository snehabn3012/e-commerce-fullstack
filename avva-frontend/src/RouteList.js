import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Checkout from "./core/Checkout";

import ProtectedRoute from './auth/ProtectedRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import UserProfile from "./user/UserProfile";
import PurchaseHistory from "./user/PurchaseHistory";

import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Orders from "./admin/Orders";

const RouteList = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/user/dashboard' element={<UserDashboard />} />
                    <Route path='/profile/:userId' element={<UserProfile />} />
                    <Route path='/purchase-history' element={<PurchaseHistory />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route path='/create/category' element={<AddCategory />} />
                    <Route path='/create/product' element={<AddProduct />} />
                    <Route path='/admin/orders' element={<Orders />} />
                </Route>

                <Route path="/" element={<Home />} />
                <Route path="/signin" exact element={<SignIn />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/shop" exact element={<Shop />} />
                <Route path="/product/:productId" exact element={<Product />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/checkout" exact element={<Checkout />} />

            </Routes>
        </Router >
    )
}

export default RouteList;