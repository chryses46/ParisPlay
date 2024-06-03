module.exports = (sequelize, DataTypes) => {
    const Membership = sequelize.define('Membership', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      num_children: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      num_visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: 'memberships',
      timestamps: false
    });
    
    Membership.associate = function(models) {
      Membership.belongsTo(models.User, {
        foreignKey: 'user_uuid',
        as: 'user'
      });
    };
    
    return Membership;
  };
