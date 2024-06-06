var express = require('express');
var router = express.Router();
const models = require('../models'); // Import all models

const resource_type_plurals = {
    'User':'Users',
    'Child':'Children',
    'Event':'Events',
    'Membership':'Memberships'
};
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

router.get('/', function(req, res, next) {

    if (!req.user) { // for local only testing
        req.user = {
            uuid: '0ac43715-da1b-4a73-9761-aed9bf46b43b',
            email: 'danjfrank08@gmail.com',
            name: 'Daniel TEST',
            phone: '214-534-7738',
            children: [],
              
        }
    }
    res.render('admin', { 
      title: 'Paris Play | Admin', 
      user: req.user
      }
    );
});

router.get('/add/:resource', function(req, res, next){
    const resource_name = getKeyByValue(resource_type_plurals, req.params.resource);
    const ResourceModel = models[resource_name];
    const attributes = Object.keys(ResourceModel.rawAttributes).map(key => {
      const attribute = ResourceModel.rawAttributes[key];
      return {
        name: key,
        type: attribute.type.key,
        allowNull: attribute.allowNull
      };
    });
  
    res.render('add_resource', {
      title: `Paris Play | Add ${resource_name}`,
      resource_title: resource_name,
      resource_attributes: attributes
    });
  });
  

router.get('/:resource', async function (req, res, next) {
    const resource_name = req.params.resource;
    const ResourceModel = models[resource_name];
    if (!ResourceModel) {
        return res.status(404).send(`No resource model exists for ${resource_name}`);
    }

    try {
        const resources = await ResourceModel.findAll();
        let resource_list = resources.map((resource)=>{
            return resource.dataValues;
        });

        res.render('view_resources', {
            title: `Paris Play | View ${resource_type_plurals[resource_name]}`,
            resource_list: resource_list,
            resource_title: resource_type_plurals[resource_name]
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error occurred.');
    }
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