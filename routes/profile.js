var express = require('express');
var router = express.Router();
const { User, Child } = require('../models');

router.get('/', function(req, res, next) {
    res.render('profile', { 
      title: 'Paris Play | My Profile', 
      user: req.user
      }
    );
  });

  router.post('/update', async function(req, res, next) {
    try {
      const {name, phone } = req.body;
      const user = await User.findOne({ 
        where: { 
          email: req.user.email 
        } 
      });
  
      if (!user) {
        return res.status(404).send('User not found'); // change to error message on profile screen
      }
  
      // Update the user
      user.name = name || user.name;
      user.phone = phone || user.phone;
  
      await user.save();
      res.redirect('/profile');
    } catch (error) {
      console.error('Error updating the user: ', error);
      res.status(500).send('Error updating the user');
    }
  });
  
  router.post('/add-children', async function(req, res, next){
    try {
      // Assuming req.body.children is an array of children
      const children = Array.isArray(req.body) ? req.body: [req.body];
  
      // Loop over the children array
      for (let childData of children) {
        const { first_name, last_name, dob } = childData;
  
        // Check if the child already exists
        const existingChild = await Child.findOne({
          where: { 
            user_email: req.user.email, 
            first_name, 
            last_name,
            dob 
          }
        });
  
        if (existingChild) {
          console.error('Child already exists');
          return res.status(400).send('Child already exists');
        }
  
        // Create a new child
        const child = await Child.create({
          user_email: req.user.email, 
          first_name, 
          last_name,
          dob 
        });
  
        console.log('Child created: ', child);
  
        if(!req.user.children)
          req.user.children = [];
  
        req.user.children.push(child.dataValues);
      }
      res.redirect('/profile');
    } catch (error) {
      console.error('Error adding the child: ', error.name);
      res.status(500).send('Error adding child');
    }
  });

  router.get('/delete-child', async function(req, res, next){
   // use an identifier to pass to this function to find the entry in the db
   // delete the entry in the DB
   console.debug("Child deleted");
   res.redirect('/profile');
  });

module.exports = router;