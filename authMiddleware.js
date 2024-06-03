const { User, Child, Membership } = require('./models');

async function ensureAuthenticated(req, res, next) {
  if (req.oidc.isAuthenticated()) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email: req.oidc.user.email },
        defaults: {
          name: req.oidc.user.name,
          email: req.oidc.user.email
        },
        include: [{
          model: Child,
          as: 'children'
        },
        {
          model: Membership,
          as: 'membership'
        }]
      });
      let hasAdminRole = ensureRole(process.env.AUTH0_ROLE911, req.oidc.user);
      if (hasAdminRole) {
        //console.debug(`Has Admin role. Can access Admin page.`);
      }
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
    uuid: dataUser.dataValues.uuid,
    email: dataUser.dataValues.email,
    name: dataUser.dataValues.name,
    phone: dataUser.dataValues.phone,
    children: [],
  };

  if(dataUser.dataValues.children != null && dataUser.dataValues.children.length > 0){
    dataUser.dataValues.children.forEach(child => {
      user.children.push(child.dataValues);
    });
  };

  if (user.membership && user.membership.num_visits == 0) {
    user.membership.num_visits = 'unlimited';
  }

  return user;
}

function ensureRole(role, oidc_user) {
  //console.debug(`ensureRole: ${role}`);
  const user = oidc_user;
  if (user && user[`${process.env.AUTH0_AUDIENCE}/roles`].includes(role)) {
    console.debug(`user is an admin in auth0: ${user[`${process.env.AUTH0_AUDIENCE}/roles`]}`);
    return true;
  } 
  return false
}

async function adminOnly(req, res, next){
  const user = req.oidc.user;
  if (user && user[`${process.env.AUTH0_AUDIENCE}/roles`].includes(process.env.AUTH0_ROLE911)) {
    next();
  }else{
    res.status(403).send('Forbidden');
  }
}

module.exports = {
  ensureAuthenticated,
  getIdentity,
  ensureRole,
  adminOnly
};
