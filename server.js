const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const {todoRouter} = require('./routers/todoRouter');
const {userRouter} = require('./routers/userRouter');


const app = express();
const PORT = 3001;

const SECRET = 'chocolate-cake';

app.use(expressJwt({secret: SECRET}).unless({path: []})); 
app.use(express.json());
app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log('server is up');
});

