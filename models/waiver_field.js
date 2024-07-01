module.exports = (sequelize, DataTypes) => {
    const Waiver_Field = sequelize.define('Waiver_Field', {
      uuid:{
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      waiver_type_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: 'waiver_types', // name of the table, not the model
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      field_type: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      field_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      }
    }, {
      tableName: 'waiver_fields',
      timestamps: false
    });
  
    Waiver_Field.associate = function(models) {
      Waiver_Field.belongsTo(models.Waiver_Type, {
        foreignKey: 'waiver_type_uuid',
        as: 'waiver_type'
      });
    };
  
    return Waiver_Field;
  };