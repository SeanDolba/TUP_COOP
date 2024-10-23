const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const db = require('./dbConfig');

//Routes
const usersRoute = require('./routers/users');

const api = process.env.API_URL;

//routers (lagi dapat nasa pinakababa)
app.use(`${api}/users`, usersRoute);

//middleware methods
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

app.listen(3000, ()=>{
    console.log('server is now running http://localhost:3000');
})