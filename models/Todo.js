const {v4: uuid} = require('uuid');

class Todo {    
    constructor(description, date) {
        this.description = description && description.toString().trim();
        this.date = date;
        this.userId = 'some-user-id';
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