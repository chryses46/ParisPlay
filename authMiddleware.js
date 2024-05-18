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
      req.user = configRequestUser(user);
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
      req.user = configRequestUser(user);
      next();
    } catch (error) {
      console.error('Error interacting with the database: ', error);
    }
  }
  else{
    next();
  }
}

function configRequestUser (dataUser){
  let user = {
    email: dataUser.dataValues.email,
    name: dataUser.dataValues.name,
    phone: dataUser.dataValues.phone,
    children: []
  };

  if(dataUser.dataValues.children != null && dataUser.dataValues.children.length > 0){
    dataUser.dataValues.children.forEach(child => {
      user.children.push(child.dataValues);
    });
  };

  return user;
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
