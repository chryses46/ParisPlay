module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        uuid:{
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        adult_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        adult_email: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        adult_phone: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        event_type: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
        guests: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        chosen_child: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        child_birthday: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        child_gender: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        child_color: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        party_type: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        add_on: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        decoration_theme: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        tablecloth_color: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        food: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        invitations: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        field_trip_school_name: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        field_trip_num_kids: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        field_trip_num_teachers: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        field_trip_age_range: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        field_trip_date_range: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        comments: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
    }, {
        tableName: 'events',
        timestamps: false
    });
    return Event;
};
