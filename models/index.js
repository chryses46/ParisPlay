require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const Sequelize = require('sequelize');
const UserModel = require('./user');
const ChildModel = require('./child');
const EventModel = require('./event');
const MembershipModel = require('./membership');
const Waiver_TypeModel = require('./waiver_type');
const Waiver_FieldModel = require('./waiver_field');
const Completed_WaiverModel = require('./completed_waiver');

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
const Waiver_Type = Waiver_TypeModel(sequelize, Sequelize);
const Waiver_Field = Waiver_FieldModel(sequelize, Sequelize);
const Completed_Waiver = Completed_WaiverModel(sequelize, Sequelize);
User.associate(sequelize.models);
Child.associate(sequelize.models);
Membership.associate(sequelize.models);
Waiver_Type.associate(sequelize.models);
Waiver_Field.associate(sequelize.models);
Completed_Waiver.associate(sequelize.models);

module.exports = {
  User,
  Child,
  Event,
  Membership,
  Waiver_Type,
  Waiver_Field,
  Completed_Waiver
};