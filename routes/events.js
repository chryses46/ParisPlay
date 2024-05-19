var express = require('express');
const Joi = require('joi');
var router = express.Router();
const node_mailer = require('nodemailer');
const { Event } = require('../models');
let transporter = node_mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
const event_schema = Joi.object({
    adult_name: Joi.string().max(45).required(),
    adult_email: Joi.string().email().max(45).required(),
    adult_phone: Joi.string().max(45).allow(null,""),
    event_type: Joi.string().max(45).allow(null,""),
    date: Joi.date().allow(null,""),
    time: Joi.string().length(5).allow(null,""),
    guests: Joi.number().integer().allow(null,""),
    chosen_child: Joi.string().max(45).allow(null,""),
    child_age: Joi.string().max(45).allow(null,""),
    kid_gender: Joi.string().max(45).allow(null,""),
    child_color: Joi.string().max(45).allow(null,""),
    theme: Joi.string().max(45).allow(null,""),
    tablecloth_color: Joi.string().max(45).allow(null,""),
    food: Joi.string().max(45).allow(null,""),
    invitations: Joi.string().max(45).allow(null,""),
    field_trip_school_name: Joi.string().max(120).allow(null,""),
    field_trip_num_kids: Joi.number().integer().allow(null,""),
    field_trip_num_teachers: Joi.number().integer().allow(null,""),
    field_trip_age_range: Joi.number().integer().allow(null,""),
    field_trip_date_range: Joi.string().max(45).allow(null,""),
    comments: Joi.string().max(250).allow(null,""),
});

/* GET events page. */
router.get('/', function(req, res, next) {
    res.render('events', { 
        title: 'Paris Play | Events',
        user: req.user
    });
});


router.post('/book', async function (req, res, next) {
    const validation = event_schema.validate(req.body);
    let payload = validation.value;
    for (let key in payload) {
        if (payload[key] === '') {
            payload[key] = null;
        }
    }
    var event;
    try{
        event = await Event.create(payload);

        if (event) {
            console.debug(event);
            let mail_options = {
                from: 'bookings@parisplay.kids',
                to: 'parisplayptx@gmail.com',
                subject: 'New Booking Request',
                text: JSON.stringify(payload)
            };
        
            transporter.sendMail(mail_options, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        
            let confirmation_options = {
                from: 'bookings@parisplay.kids',
                to: req.body.adult_email, 
                subject: 'Paris Play Booking Confirmation',
                text: 'We got your booking request and will reach out soon!'
            };
        
            transporter.sendMail(confirmation_options, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Confirmation email sent: ' + info.response);
                }
            });
        
            res.render('events', { 
                title: 'Paris Play | Events',
                user: req.user
            });
        }
    }catch(error){
        console.error(`Error while creating event: ${error}`);
    }
});

module.exports = router;