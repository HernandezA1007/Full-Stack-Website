const mongoose = require("mongoose");

const shopItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    // Add more fields later..
    // vendor/3rd party linking
});

module.exports = mongoose.model('ShopItem', shopItemSchema);