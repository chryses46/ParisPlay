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
      return res.status(404).send('User not found');
    }
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
    const children = Array.isArray(req.body) ? req.body: [req.body];
    for (let childData of children) {
      const { first_name, last_name, dob } = childData;
      const existingChild = await Child.findOne({
        where: { 
          user_uuid: req.user.uuid,
          user_email: req.user.email,
          first_name, 
          last_name,
          dob,
        }
      });

      if (existingChild) {
        console.error('Child already exists');
        return res.status(400).send('Child already exists');
      }

      const child = await Child.create({
        user_uuid: req.user.uuid,
        user_email: req.user.email,
        first_name,
        last_name,
        dob,
      });

      if(!req.user.children)
        req.user.children = [];

      req.user.children.push(child.dataValues);
    }
    res.redirect('/profile');
  } catch (error) {
    console.error('Error adding the child: ', error);
    res.status(500).send('Error adding child');
  }
});

router.delete('/:id', async function(req, res, next){
  let id = req.params.id;
  try{
    const deleted = await Child.destroy({
      where:{
        uuid: id,
      }
    })
    res.redirect('/profile');
  }catch(error){
    console.error("Error deleting child: ", error)
    res.status(500).send('Error deleting child');
  }
});
module.exports = router;