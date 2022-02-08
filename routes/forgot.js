const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Chamando o arquivo que conecta com o mongodb
const { Mongoose } = require('../db');

// Cria a collection users
require('../models/Users')

const Users = Mongoose.model('users');

router.get('/', (req,res) => {
    res.render('pages/forgot', { warning: null })
});

router.post('/', async(req,res) => {
    const userName = req.body.userName;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const verifiedUser = await Users.findOne({ userName: userName });
    const erros = [];

    // Regras de validação para alteração de senha
        // Verifica se os inputs estão vazios
        if(userName.length == 0){ erros.push('O campo Username está vazio.') };
        if(password1.length == 0){ erros.push('O campo nova senha está vazio.') };
        if(password2.length == 0){ erros.push('O campo repita senha está vazio.') };

        // Verifica se as senhas possuem o mesmo tamanho
        if(password1.length != password2.length){ 
            erros.push('As senhas precisam ter o mesmo tamanho.') 
        };

        // Verifica se as senha possuem no mínimo 7 caracteres
        if(password1.length > 0 && password1.length < 7){ 
            erros.push('Senha curta, digite no mínimo 7 caracteres.') 
        } 
        
        // Verifica se as senhas são iguais
        if(password1 !== password2){ 
            erros.push('As senhas informadas precisam ser iguais.') 
        }

        // Verifica se userName está cadastrado
        if(!verifiedUser){ erros.push('Nome de usuário não cadastrado!') }

    if(erros.length > 0){
        res.render('pages/forgot', { warning: erros })
    }else{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password = bcrypt.hashSync(password1,salt);

        try{
            await Users.findOneAndUpdate({ userName: userName }, { password: password })
            //console.log(user);
            res.redirect('/login?forgot=success')
        }catch(error){
            next(error)
        }
    }
})

module.exports = router



