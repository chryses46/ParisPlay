module.exports = (sequelize, DataTypes) => {
    const Completed_Waiver = sequelize.define('Completed_Waiver', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      waiver_type_uuid: {
        type: DataTypes.UUIDV4,
      },
      user_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'users', // name of the table, not the model
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    }, {
      tableName: 'completed_waivers',
      timestamps: false
    });
  
    Completed_Waiver.associate = function(models) {
      Completed_Waiver.belongsTo(models.User, {
        foreignKey: 'user_uuid',
        as: 'user'
      });
    };
  
    return Completed_Waiver;
  };