require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const Sequelize = require('sequelize');
const UserModel = require('./user');
const ChildModel = require('./child');

// web
// const sequelize = new Sequelize(
//   'u175pbutpnxsaehp', 
//   'i3p3q45ghq8by3mq', 
//   'udp9hmgbj7bwlebl', 
//   {
//     host: 'e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     dialect: 'mysql'
//   }
// );


//local
const sequelize = new Sequelize(
  process.env.SQL_DB,  //sql_db
  process.env.SQL_USER, //sql_user
  process.env.SQL_PASS, //sql_pass
  {
    host: process.env.SQL_HOST, //sql_host
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