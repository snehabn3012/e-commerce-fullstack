import React, { useState, useEffect } from "react";
import { processPayment } from "../api/checkout";
import { createOrder } from "../api/order";

import { emptyCart } from "../utils/cartHelpers";
// import ProductCard from "../ui/ProductCard";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
// import "braintree-web"; // not using this package
import toast, { Toaster } from "react-hot-toast";

const Checkout = ({ products }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: "",
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const handleAddress = (event) => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products?.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let deliveryAddress = data.address;

    const handlePayment = async () => {

        const createOrderData = {
            amount: getTotal(products),
            currency: 'INR',
            receipt: 'receipt#1'
        }
        try {
            // Call your backend to create an order
            const data = await processPayment(userId, token, createOrderData)
            console.log("create-oorder-respond", data);

            const { order, success } = data;



            // Integrate Razorpay
            const options = {
                amount: order.amount,
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id: order.id,
                handler: function (response) {
                    // Handle the payment success
                    // console.log("create-oorder-respond_2", response);
                    emptyCart(() => {
                        console.log("payment success and empty cart");
                        setData({
                            loading: false,
                            success: true,
                        });
                    });

                    if (success) {
                        const _createOrderData = {
                            products: products,
                            transaction_id: response.razorpay_payment_id,
                            amount: response.amount,
                            address: data.address,
                        };
                        createOrder(userId, token, _createOrderData).then((res) => {
                            console.log("order creted", res);
                        })
                    }

                    console.log("success payyment response", response);
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

                },
                prefill: {
                    name: 'Your Name',
                    email: 'your-email@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Your Address',
                },
                theme: {
                    color: '#F37254',
                },
                method: {
                    upi: true, // Enable UPI payment option
                    card: true, // Enable Card payment option
                    netbanking: true, // Enable Netbanking option
                    wallet: true, // Enable Wallet payment option
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment initiation failed', error);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: "" })}>
            {products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    <button onClick={handlePayment}>Pay Now</button>

                </div>
            ) : null}
        </div>
    );

    const showError = (error) => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = (success) => (
        <div
            className="alert alert-info"
            style={{ display: success ? "" : "none" }}
        >
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = (loading) =>
        loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            <Toaster />
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
}

export default Checkout;
