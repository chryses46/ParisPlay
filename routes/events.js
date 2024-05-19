var express = require('express');
const Joi = require('joi');
var router = express.Router();
const node_mailer = require('nodemailer');
//works
let transporter = node_mailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '750f0f001@smtp-brevo.com',
        pass: 'qnC5Ox1DMQUGFmW9' // your Brevo password
    }
});
// cannot use- simple password issue
// let transporter = node_mailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'parisplayptx@gmail.com',
//         pass: 'PlayParasite2024!'
//     }
// });
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


router.post('/book', function (req, res, next) {
    //parse form data
    // return back if validation fails
    const payload = event_schema.validate(req.body);
    console.log(payload);

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
});

module.exports = router;