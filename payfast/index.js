var app = require('./config/custom-express')();

app.listen(3003, function(){
    console.log('Servidor rodando na porta 3003')
});

//consign -> ajuda no carregamento das rotas