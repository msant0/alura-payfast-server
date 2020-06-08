const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const consign = require('consign')

module.exports = function(){
    const app = express()
    app.use(bodyParser.json())
    app.use(expressValidator())

    consign()
        .include('routes')
        .into(app)

    return app
}