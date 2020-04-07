const express = require('express');
const app = express();
const PORT = 3001;
const {todoRouter} = require('./routers/todoRouter');

app.use(express.json());
app.use('/todos', todoRouter);

app.listen(PORT, () => {
    console.log('server is up');
});

