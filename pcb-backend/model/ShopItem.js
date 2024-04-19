const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    vendorUrl: { type: String, required: true },
    // Edit fields later..
    category: { type: String, required: false }
});

module.exports = mongoose.model('ShopItem', shopItemSchema);