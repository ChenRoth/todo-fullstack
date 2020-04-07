const express = require('express');
const app = express();
const PORT = 3001;
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const USERS_DB_PATH = path.join(__dirname, 'users.json');
const TODOS_DB_PATH = path.join(__dirname, 'todos.json');

const writeFile = promisify(fs.writeFile); // fs.writeFile(path, content, (err) => {...}) => await writeFile(path, content);
const readFile = promisify(fs.readFile); // fs.readFile(path, {encoding: 'UTF-8'}, (err, content) => {...}) => const content = await readFile(path, {encoding: 'UTF-8'});


app.listen(PORT, () => {
    console.log('server is up');
});


async function readUsers() {
    return readDB(USERS_DB_PATH);
}

async function readTodos() {
    return readDB(TODOS_DB_PATH);
}

async function writeUsers(users) {
    await writeDB(USERS_DB_PATH, users);
}

async function writeTodos(todos) {
    await writeDB(TODOS_DB_PATH, todos);
}


async function readDB(path) {
    const rawData = await readFile(path, { encoding: 'UTF-8' });
    return JSON.parse(rawData);
}

async function writeDB(path, data) {
    await writeFile(path, JSON.stringify(data));
}
