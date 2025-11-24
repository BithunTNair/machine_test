const express = require('express');
const { fetchProductsByPagination, fetchProductById, addToCart, getCart, updateQuantity, removeFromCart, createOrder, viewOrders } = require('../controller/user_needs/userController');
const { addReview, getReviews } = require('../controller/review/reviews');
const router = express.Router();

router.get('/show-products', fetchProductsByPagination);
router.get('/product-details/:id', fetchProductById);
router.post('/cart/add-to-cart/:userId', addToCart);
router.put('/cart/update-quantity/:userId',updateQuantity);
router.put('cart/remove-item/:userId',removeFromCart);
router.get('/cart/get-your-cart/:userId', getCart);
router.post('/orders/create-order/:cartId',createOrder);
router.get('/view-orders/:userId',viewOrders)

router.post('/products/:productId/add-reviews', addReview); 
router.get('/products/:productId/reviews', getReviews); 

module.exports = router;