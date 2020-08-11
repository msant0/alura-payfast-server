const fs = require('fs')
const constants = require('../helpers/constants')

module.exports = function(app){
    app.post('/upload/image', function(req, res){
        console.log(constants.RECEIVING_IMAGE)

        const filename = req.headers.filename

        req.pipe(fs.createWriteStream('files/'+ filename))
        .on('finish', function(){
            res.status(201).send(constants.RECEIVING_IMAGE_WITH_SUCCESS)
        })
    })
}