const fs = require('fs')
const constants = require('../helpers/constants')

fs.readFile('image.png', function (error, buffer) {
    console.log(constants.FILE_READED)

    fs.writeFile('image2.png', buffer, function (err) {
        if (err) console.log(err)
        console.log(connstants.FILE_WRITED)
    })
})