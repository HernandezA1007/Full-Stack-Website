const express = require("express");
const Contact = require("../model/Contact");
const router = express.Router();


// Route for contact form data
router.post('/contact', async (req, res) => {
    const newContact = new Contact(req.body);
    try {
        await newContact.save();
        res.status(201).send("Contact form received");
    } catch (error) {
        res.status(400).send(error);
    }
});