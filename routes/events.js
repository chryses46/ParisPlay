var express = require('express');
var router = express.Router();
/* GET events page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    res.render('events', { 
        title: 'Paris Play | Events',
        user: req.user
    });
});


router.post('/book', function (req, res, next) {
    // parse form data
        // return back if validation fails
    // check booking against current events (stretch PBI)
        // if clear, book (create DB entry)
        // else - return back "event booking failed: reason" 
    // return back to the events page
    res.redirect('/events');
});
module.exports = router;