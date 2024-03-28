const express = require("express");
const ShopItem = require("../model/ShopItem");
const router = express.Router();

/* This is more for Admin interface */

// POST - Create a new shop item
router.post('/', async (req, res) => {
    const newShopItem = new ShopItem(req.body);

    try {
        const savedShopItem = await newShopItem.save();
        res.status(201).json(savedShopItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL - Retrieve all shop items
router.get('/', async (req, res) => {
    try {
        const shopItems = await ShopItem.find();
        res.json(shopItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET - Retrieve a single shop item by ID
router.get('/:id', async (req, res) => {
    try {
        const shopItem = await ShopItem.findById(req.params.id);
        if (!shopItem) res.status(404).json({ message: 'Shop item not found' });
        res.json(shopItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT - Update a shop item by ID
router.put('/:id', async (req, res) => {
    try {
        const shopItem = await ShopItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shopItem) res.status(404).json({ message: 'Shop item not found' });
        res.json(shopItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Delete a shop item by ID
router.delete('/:id', async (req, res) => {
    try {
        const shopItem = await ShopItem.findByIdAndDelete(req.params.id);
        if (!shopItem) res.status(404).json({ message: 'Shop item not found' });
        res.json({ message: 'Shop item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;