module.exports = function(app){
    app.get('/', (req,res)=>{
        res.send("hello, it's me")
    })
}