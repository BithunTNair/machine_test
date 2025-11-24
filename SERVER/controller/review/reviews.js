const PRODUCTS = require('../../models/productModel');

const addReview = async (req, res) => {
    const { productId } = req.params; 
    const { userId, rating, comment } = req.body; 
    if (!productId || !userId || !rating || !comment) {
        return res.status(400).json({ error: 'All fields (productId, userId, rating, comment) are required.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
    
        const updatedProduct = await PRODUCTS.findByIdAndUpdate(
            productId,
            {
                $push: {
                    reviews: {
                        userId,
                        rating,
                        comment,
                        createdAt: new Date()
                    }
                }
            },
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(201).json({
            message: 'Review added successfully.',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'something went wrong' });
    }
};

const getReviews = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required.' });
    }

    try {
     
        const product = await PRODUCTS.findById(productId)
            .select('reviews') 
            .populate({
                path: 'reviews.userId', 
                select: 'fullName email' 
            });

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        return res.status(200).json({
            message: 'Reviews fetched successfully.',
            reviews: product.reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Something went wrong.' });
    }
};

module.exports = { addReview, getReviews };

