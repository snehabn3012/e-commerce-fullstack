const Razorpay = require('razorpay');
const User = require("../models/user");
require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


module.exports.createOrder = async (req, res) => {
    console.log("creaing payment");
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
            currency: currency || "INR",
            receipt,
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.log("err", error);
        res.status(500).json({ success: false, message: "Order creation failed", error });
    }
};

