const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { readUsers, writeUsers } = require('../db');

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
    const { id, password } = req.body;
    const users = await readUsers();
    if (users[id]) {
        res.status(400).send({ success: false, msg: 'user already exists' });
        return;
    }

    users[id] = { id, password };
    await writeUsers(users);

    const token = generateToken(users[id]);

    res.send({ success: true, msg: 'welcome!', token });
});


userRouter.post('/login', async (req, res) => {
    const { id, password } = req.body;
    const users = await readUsers();
    if (!users[id] || users[id].password !== password) {
        res.status(401).send({ success: false, msg: 'user id and password don\'t match' });
        return;
    }

    const token = generateToken(users[id]);

    res.send({ success: true, msg: 'welcome back!', token });
});

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

module.exports = {
    userRouter
}

