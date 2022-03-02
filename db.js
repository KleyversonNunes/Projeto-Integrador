if(process.env.NODE_ENV == "production"){
    module.exports = { mongoURI: "mongodb+srv://Kleyverson:Kymovel1800@sistemadeacesso.ry9fv.mongodb.net/sistemaDeAcesso?retryWrites=true&w=majority" }
}else{
    module.exports = { mongoURI: "mongodb://localhost/projeto_integrador" }
}