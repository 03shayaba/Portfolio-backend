const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact.js');
const sendEmail = require('../utils/sendEmail.js');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { name, email, descriptionMessage } = req.body;

        if(!name || !email || !descriptionMessage){
            return  res.status(400).json({ message: "All fields are required" });
        }

        const contact = await Contact.create({
            name,
            email,
            descriptionMessage
        });

        // Send confirmation email
        await sendEmail({ name, email, descriptionMessage });
        res.status(201).json({ message: "Message sent successfully", contact });
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });


    }
});
module.exports = router;