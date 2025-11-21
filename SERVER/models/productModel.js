const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
  
});

const products = mongoose.model('products', productSchema);
module.exports = products;