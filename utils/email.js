// emailTableGenerator.js
function generateEmailTable(payload) {
    let tableRows = '';
    const fieldsToShow = {
        'birthday': ['adult_name', 'adult_email', 'adult_phone', 'event_type', 'date', 'time', 'guests', 'chosen_child', 'child_age', 'kid_gender', 'child_color', 'theme', 'tablecloth_color', 'food', 'invitations', 'comments'],
        'field_trip': ['adult_name', 'adult_email', 'adult_phone', 'event_type', 'date', 'time', 'guests', 'field_trip_school_name', 'field_trip_num_kids', 'field_trip_num_teachers', 'field_trip_age_range', 'field_trip_date_range', 'comments'],
        'other': ['adult_name', 'adult_email', 'adult_phone', 'event_type', 'date', 'time', 'guests', 'comments']

        // Add other event types and their relevant fields here
    };

    const fieldLabels = {
        adult_name: 'Adult Name',
        adult_email: 'Adult Email',
        adult_phone: 'Adult Phone',
        event_type: 'Event Type',
        date: 'Date',
        time: 'Time',
        guests: 'Number of Guests',
        chosen_child: 'Chosen Child',
        child_age: 'Child\'s Age',
        kid_gender: 'Child\'s Gender',
        child_color: 'Favorite Color',
        theme: 'Theme',
        tablecloth_color: 'Tablecloth Color',
        food: 'Food Included',
        invitations: 'Invitations',
        field_trip_school_name: 'School Name',
        field_trip_num_kids: 'Number of Kids',
        field_trip_num_teachers: 'Number of Teachers',
        field_trip_age_range: 'Age Range',
        field_trip_date_range: 'Date Range',
        comments: 'Comments'
        // Add other fields and their labels here
    };

    const relevantFields = fieldsToShow[payload.event_type] || [];
    relevantFields.forEach(field => {
        if (payload[field] !== null && payload[field] !== undefined) {
            let value = payload[field];
            // Format the value if it's a date or boolean
            if (field === 'date' || field === 'child_age') {
                value = new Date(value).toLocaleDateString();
            } else if (typeof value === 'boolean') {
                value = value ? 'Yes' : 'No';
            }
            tableRows += `<tr><th>${fieldLabels[field]}</th><td>${value}</td></tr>`;
        }
    });

    return `
        <html>
            <body>
                <table>
                    ${tableRows}
                </table>
            </body>
        </html>`;
}

module.exports = {
    generateEmailTable
}
