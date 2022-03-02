const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const Mongoose = require('mongoose');

module.exports = (passport) => {
  // Configurando o passport
  
    // Função que que verifica se o nome é válido
    async function findUserName (userName){
        //const { Mongoose } = require('./db');
        require('./models/Users');
        const Users = Mongoose.model('users');
        const doc = await Users.findOne({ userName: userName });
        return doc;
    }

    // Função que que retorna os dados do usuário de acordo com o id
    async function findUserById(id){
        //const { Mongoose } = require('./db');
        require('./models/Users');
        const Users = Mongoose.model('users');
        const doc = await Users.findById(id);
        return doc;
    }


    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        try{
            const user = findUserById(id);
            done(null, user);
        }catch(error){
            done(error, null);
        }
    })

    passport.use(new LocalStrategy({
       usernameField: 'userName',
       passwordField: 'password',
    },
        (userName, password, done) => {
            try{
                //console.log(userName);
                const user = findUserName(userName);

                user.then(user => {
                    // usuario não encontrado
                    if(!user){ return done(null, false) }

                    // comparando as senhas
                    const isValid = bcrypt.compareSync(password, user.password);
                    if(!isValid) return done(null, false);
                    
                    return done(null, user)
                })              
            }catch(error){
                done(error, false)
            }
        }
    ))
}