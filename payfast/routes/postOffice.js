module.exports = function (app) {
    app.post('/correios/calcula-prazo', function (req, res) {
        const deliveryData = req.body

        const SOAPClientPostOffice = new app.services.SOAPClientPostOffice()
        SOAPClientPostOffice.CalculateTerm(deliveryData, function (error, result) {
            if (error) {
                return res.status(500).send(error)
            }
            return res.json(result)
        })
    })
}