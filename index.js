const express = require('express');
const db = require('./db')

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
app.use(cors());

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const borrowalRouter = require('./routers/borrowalRouter');

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Welcome to node.js Server and All the best for your project")
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/borrowal', borrowalRouter);
const port = process.env.PORT || 3000;

app.listen(port);
