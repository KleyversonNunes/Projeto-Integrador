const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Chamando o arquivo que conecta com o mongodb
//const { Mongoose } = require('../db');
const Mongoose = require('mongoose');

// Cria a collection users
require('../models/Users')
/* 
   Cria o model de usuario, com esse model é possivel salvar 
   novos usuarios na collection, deletar ou editar informações
*/
const Users = Mongoose.model('users');

// Rota de Cadastro de Usuários
router.get('/', (req,res) => {
    if(req.user){
        res.redirect('/home')
    }else{
        res.render('pages/signup', { warning: null })
    }
});

router.post('/', async(req,res,next) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const verifiedName = await Users.findOne({ userName: userName });
    const verifiedEmail = await Users.findOne({ email: email });

    const erros = [];
    if(verifiedName){
        // Verifica se o userName já foi utilizado
        erros.push('O userName informado já está cadastrado.')
    }

    if(verifiedEmail){
        // Verifica se o email já foi utilizado
        erros.push('O email informado já está cadastrado.')
    }

    // Verifica se o campo userName está vázio
    if(userName.length == 0){ erros.push('O campo userName está vazio.') };
    // Verifica se o campo email está vázio
    if(email.length == 0){ erros.push('O campo email está vazio.') };
    // Verifica se o campo senha está vázio
    if(req.body.password.length == 0){ erros.push('O campo password está vazio.') };

    // Verifica se a senha possui mais de 6 caracteres
    if(req.body.password.length > 0 && req.body.password.length < 7){ 
        erros.push('Senha muito curta. No mínimo 7 caracteres.') 
    }

    if(erros.length > 0){ 
        res.render('pages/signup',{ warning: erros }) 
    }else{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password = bcrypt.hashSync(req.body.password, salt);

        const user = new Users({ userName, email, password });

        try{
            await user.save();
            res.redirect('login?signup=success');
        }catch (err){
            next(err)
        }
    };   
})

module.exports = router;


