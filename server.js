const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');

const {todoRouter} = require('./routers/todoRouter');
const {userRouter} = require('./routers/userRouter');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(expressJwt({secret: process.env.JWT_SECRET}).unless({path: ['/users/register', '/users/login']})); 
app.use(express.json());
app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log('server is up');
});

