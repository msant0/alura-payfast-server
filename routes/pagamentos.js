module.exports = function(app){
    app.get('/pagamentos', function(req, res){
        console.log("requisição recebida na porta 3002")
        res.send('Retorno da requisição')
    })
}


//receber e exportar atributos