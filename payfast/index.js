var app = require('./config/custom-express')();

app.listen(3002, function(){
    console.log('Servidor rodando na porta 3002')
});

//consign -> ajuda no carregamento das rotas