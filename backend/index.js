const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const dishRouter = require('./api/dish')
const userRouter = require('./api/user')

const port = process.env.PORT 
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(dishRouter);
app.use(userRouter);


app.get('/',(req,res)=>{
    res.send("hello from node js server!")
})

app.get('/1/:id',(req,res)=>{
    res.send(req.params.id)
})

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})
