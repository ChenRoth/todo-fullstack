const { Router } = require('express');
const { readTodos, writeTodos } = require('../db');
const { Todo } = require('../models/Todo');

const todoRouter = Router();

todoRouter.post('/', async (req, res) => {
    const { id: userId } = req.user;
    const { description, date } = req.body;
    const todo = new Todo(description, date, userId);

    const errors = todo.validate();
    if (errors.length) {
        res.status(400).send(errors);
        return;
    }

    const todos = await readTodos();
    todos[todo.id] = todo;
    await writeTodos(todos);

    res.send(todo);
});

module.exports = {
    todoRouter
};