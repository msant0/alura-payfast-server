const fs = require('fs')
const constants = require('../helpers/constants')

fs.createReadStream('image.jpg')
    .pipe(fs.createWriteStream('image-with-stream.jpg'))
    .on('finish', function(){
        console.log(constants.FILE_WRITED_STREAM)
    })