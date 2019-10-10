const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./config/db_connection");
//const mongoose = require('mongoose')
//const morgan = require('morgan')

//set JSON as MIME type
app.use(bodyParser.json());

//front-end not sending any form data
app.use(bodyParser.urlencoded({
    extended: false
}));


// middel ware allow cross site scripting 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        app.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE')
        return res.status(200).json({});
    }
    next()
})

// check connection 

const  con = db.getConnection();
con.connect((err) => {
    if (!err) {
        console.log(`DB connection succeeded`);
    } else {
        console.log(`Error occured in connection \n Error: ${JSON
        .stringify(err,undefined,2)}`);
    }
})

//router 
const employeeRouter = require('./api/employee')
app.use('/employee',employeeRouter)



// middel ware handling error
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})

module.exports = app;