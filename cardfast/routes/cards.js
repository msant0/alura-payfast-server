const constants = require('../helpers/constants')

module.exports = function(app){
    app.post('/cartoes/autoriza', function(req,res){
        var card = req.body

        req.assert('number', constants.NUMBER_IS_REQUIRED).notEmpty().len(16,16)
        req.assert('flag', constants.FLAG_IS_REQUIRED).notEmpty()
        req.assert('expiration_year', constants.YEAR_EXPIRATION_IS_REQUIRED).notEmpty().len(4,4)
        req.assert('expiration_month', constants.MONTH_EXPIRATION_IS_REQUIRED).notEmpty().len(2,2)
        req.assert('cvv', constants.CVV_IS_REQUIRED).notEmpty().len(3,3)

        var errors = req.validationErrors()

        if(errors){
            console.log(constants.MESSAGE_VALIDATION_ERRORS)
            return res.status(400).send(errors)
        }

        card.status = constants.STATUS_AUTHORIZED

        let response = {
            card_data: card
        }

        return res.status(201).json(response)
    })
}