const express = require('express');
const router = express.Router()

const { userById } = require('../controllers/user');
const {
    create, productById, read,
    remove, update, list, listRelated,
    listCategories,
    listBySearch, photo
} = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove);
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update);

router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/search', listBySearch);
router.get('/products/photo/:productId', photo);


router.param('userId', userById);
router.param('productId', productById);

module.exports = router;