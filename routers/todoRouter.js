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

todoRouter.get('/', async (req, res) => {
    const { id: userId } = req.user;
    const todosDb = await readTodos();  
    const todos = Object.values(todosDb);
    const myTodos = todos.filter(todo => todo.userId === userId);
    res.send(myTodos);
});

module.exports = {
    todoRouter
};