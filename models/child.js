module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
      user_email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users', // name of the table, not the model
          key: 'email'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
        foreignKey: 'user_email',
        as: 'user'
      });
    };
  
    return Child;
  };
  