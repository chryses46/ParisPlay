const Sequelize = require('sequelize');
const UserModel = require('./user');
const ChildModel = require('./child');

const sequelize = new Sequelize(
  'paris_play', 
  'root', 
  'Th380rG3y388!', 
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const User = UserModel(sequelize, Sequelize);
const Child = ChildModel(sequelize, Sequelize);
User.associate(sequelize.models);
Child.associate(sequelize.models);
// sequelize.sync().then(() => {
//   console.log('Users db and user table have been created');
// });

module.exports = {
  User,
  Child
};