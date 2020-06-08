var app = require('./config/custom-express')();

app.listen(3001, function(){
    console.log('Servidor de cartões rodando na porta 3001')
})