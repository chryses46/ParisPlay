require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const Sequelize = require('sequelize');
const UserModel = require('./user');
const ChildModel = require('./child');
const EventModel = require('./event');
const MembershipModel = require('./membership');

const sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASS,
  {
    host: process.env.SQL_HOST,
    dialect: 'mysql'
  }
);

const User = UserModel(sequelize, Sequelize);
const Child = ChildModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);
const Membership = MembershipModel(sequelize, Sequelize);
User.associate(sequelize.models);
Child.associate(sequelize.models);
Membership.associate(sequelize.models);

module.exports = {
  User,
  Child,
  Event,
  Membership
};