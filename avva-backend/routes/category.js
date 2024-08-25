const express = require('express');
const router = express.Router()

const { userById } = require('../controllers/user');
const { create, updateCategory, remove, read, categoryById, listAll } = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { } = require('../controllers/product');


router.post('/category/create/:userId', requireSignin, isAdmin, isAuth, create);
router.put('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, updateCategory);
router.get('/category/:categoryId/:userId', requireSignin, isAdmin, isAuth, read);
router.delete('/category/:categoryId/:userId', requireSignin, remove);
router.get('/category/all', requireSignin, listAll);



// router.get('/category/:categoryId/:userId', (req, res) => {
//     res.status(200).json({ message: 'Success', products: [] });
// });

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router;