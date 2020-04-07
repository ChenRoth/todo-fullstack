const {v4: uuid} = require('uuid');

class Todo {    
    constructor(description, date, userId) {
        this.description = description && description.toString().trim();
        this.date = date;
        this.userId = userId;
        this.id = uuid();
        this.isComplete = false;
    }

    validate() {
        const errors = [];
        const { description, date } = this;
        if (!description) {
            errors.push('description is missing');
        }
        if (isNaN(new Date(date))) {
            errors.push('date is invalid');
        }
    
        return errors;
    }
}

module.exports = {
    Todo,
}