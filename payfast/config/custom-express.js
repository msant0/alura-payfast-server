const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const consign = require('consign');

module.exports = function(){
    var app = express()

    app.use(bodyParser.urlencoded({extend: true}))
    app.use(bodyParser.json())
    app.use(expressValidator())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    consign()
        .include('routes')
        .then('connection')
        .then('dao')
        .into(app);

    return app
}