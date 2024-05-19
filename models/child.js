module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      user_email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
      },
      last_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
      }
    }, {
      tableName: 'children',
      timestamps: false
    });
  
    Child.associate = function(models) {
      Child.belongsTo(models.User, {
        foreignKey: 'user_uuid',
        as: 'user'
      });
    };
  
    return Child;
  };
  