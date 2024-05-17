const Sequelize = require('sequelize');
const UserModel = require('./user');
const ChildModel = require('./child');

const sequelize = new Sequelize(
  'u175pbutpnxsaehp', 
  'i3p3q45ghq8by3mq', 
  'udp9hmgbj7bwlebl', 
  {
    host: 'e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
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