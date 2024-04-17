const express = require("express");
const Contact = require("../model/Contact");
const router = express.Router();


// Route for contact form data
router.post('/', async (req, res) => { // /contact
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message});

    try {
        await newContact.save();
        res.status(201).json({ message: "Contact form submitted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;