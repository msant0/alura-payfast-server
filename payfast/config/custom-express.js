const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const consign = require('consign');

module.exports = function () {
    var app = express()

    app.use(morgan('common'), {
        stream: {
            write: function (message) {
                logger.info(message)
            }
        }
    })

    app.use(bodyParser.urlencoded({ extend: true }))
    app.use(bodyParser.json())
    app.use(expressValidator())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    consign()
        .include('routes')
        .then('connection')
        .then('dao')
        .then('services')
        .into(app);

    return app
}