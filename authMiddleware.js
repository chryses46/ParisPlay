const { User, Child } = require('./models');

async function ensureAuthenticated(req, res, next) {
  if (req.oidc.isAuthenticated()) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: req.oidc.user.email },
        defaults: {
          name: req.oidc.user.name,
          email: req.oidc.user.email
          // Add other user information here
        },
        include: [{
          model: Child,
          as: 'children'
        }]
      });
      // Attach the user to the request object
      console.debug("user from db: ",user.dataValues.children[0].dataValues);
      req.user = {
        email: user.dataValues.email,
        name: user.dataValues.name,
        phone: user.dataValues.phone,
        children: []
      };
      
      if(user.dataValues.children != null && user.dataValues.children > 0){
        user.dataValues.children.forEach(child => {
          req.user.children.push(child.dataValues);
        });
      };
      
      next();
    } catch (error) {
      console.error('Error interacting with the database: ', error);
    }
  } else {
    res.redirect('/login');
  }
}

async function getIdentity(req, res, next) {
  req.user = null;
  if(req.oidc.isAuthenticated()){
    try {
      const user = await User.findOne({
        where: { email: req.oidc.user.email },
        include: [{
          model: Child,
          as: 'children'
        }]
      });
      req.user = {
        email: user.dataValues.email,
        name: user.dataValues.name,
        phone: user.dataValues.phone,
        children: []
      };

      if(user.dataValues.children != null && user.dataValues.children > 0){
        user.dataValues.children.forEach(child => {
          req.user.children.push(child.dataValues);
        });
      };
      next();
    } catch (error) {
      console.error('Error interacting with the database: ', error);
    }
  }
  else{
    next();
  }
}

function ensureRole(role) {
  return function(req, res, next) {
    const user = req.oidc.user;
    if (user && user[`${process.env.AUTH0_AUDIENCE}/roles`].includes(role)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
}

module.exports = {
  ensureAuthenticated,
  getIdentity,
  ensureRole
};
