const soap = require('soap')
const constants = require('../helpers/constants')

function SOAPClientPostOffice() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
}

SOAPClientPostOffice.prototype.CalculateTerm = function (args, callback) {
    soap.createClient(this._url, function (err, client) {
        console.log(constants.SOAP_CLIENT_CREATED)

        client.CalcPrazo(args, callback)
    })
}

module.exports = function () {
    return SOAPClientPostOffice
}