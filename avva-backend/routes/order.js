const express = require('express');
const router = express.Router();

const { userById, addOrderToUserHistory } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { createOrder, listOrders, getStatusValues, updateOrderStatus } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product');


router.post(
    '/order/create/:userId',
    requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, createOrder
);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues);

router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus);


router.param('userId', userById);

module.exports = router;

