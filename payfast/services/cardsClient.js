const restify = require('restify-clients')

function cardsClient() {
    this._client = restify.createJsonClient({
        url: 'http://localhost:3001',
        version: '~1.0'
    })
}

cardsClient.prototype.authorized = function (card, callback) {
    this._client.post('/cartoes/autoriza', card, callback)
}

module.exports = function () {
    return cardsClient
}