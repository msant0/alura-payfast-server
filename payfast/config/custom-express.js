const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const consign = require('consign');

module.exports = function(){
    var app = express()

    app.use(bodyParser.urlencoded({extend: true}))
    app.use(bodyParser.json())
    app.use(expressValidator())

    consign()
        .include('routes')
        .then('connection')
        .then('dao')
        .into(app);

    return app
}