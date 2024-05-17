module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
      }
    }, {
      tableName: 'users',
      timestamps: false
    });
    
    User.associate = function(models) {
      User.hasMany(models.Child, {
        foreignKey: 'user_email',
        as: 'children'
      });
    };
    
    return User;
  };
