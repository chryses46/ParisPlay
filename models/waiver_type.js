module.exports = (sequelize, DataTypes) => {
    const Waiver_Type = sequelize.define('Waiver_Type', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
      }
    }, {
      tableName: 'waiver_types',
      timestamps: false
    });
  
    Waiver_Type.associate = function(models) {
      Waiver_Type.hasMany(models.Waiver_Field, {
        foreignKey: 'waiver_type_uuid',
        as: 'waiver_fields'
      });
    };
  
    return Waiver_Type;
  };
  