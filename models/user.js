module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      member: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    }, {
      tableName: 'users',
      timestamps: false
    });
    
    User.associate = function(models) {
      User.hasMany(models.Child, {
        foreignKey: 'user_uuid',
        as: 'children'
      });
      
      User.hasMany(models.Membership, {
        foreignKey: 'user_uuid',
        as: 'membership'
      });
    };
    
    return User;
  };
