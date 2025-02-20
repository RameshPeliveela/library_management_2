const express = require('express');
const db = require('./db')

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {authentication} = require('./middlewares/authentication')

app.use(cookieParser());
app.use(cors());

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const borrowalRouter = require('./routers/borrowalRouter');

app.use(bodyParser.json())

app.get('/', authentication,(req, res)=>{
    return res.status(200).json(req.user)
})

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/borrowal', borrowalRouter);
const port = process.env.PORT || 3000;

app.listen(port);
