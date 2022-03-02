if(process.env.NODE_ENV == "production"){
    module.exports = { mongoURI: "mongodb+srv://Kleyverson:Kymovel19@projetointegrador.iagn4.mongodb.net/projetoIntegrador?retryWrites=true&w=majority" }
}else{
    module.exports = { mongoURI: "mongodb://localhost/projeto_integrador" }
}