const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

// Importando o Mongoose
//const { Mongoose } = require('../db');
const Mongoose = require('mongoose');

// Cria a collection users
require('../models/Users')
/* 
   Cria o model de usuario, com esse model é possivel salvar 
   novos usuarios na collection, deletar ou editar informações
*/
const Users = Mongoose.model('users');

// Rota de listagem de usuários
router.get('/', async (req,res) => {
    const docs = await Users.find();

    req.user.then(user => {
        //if(user.eAdmin)
            res.render('users/index', { 
                docs: docs, 
                userName: null,
                eAdmin: user.eAdmin
            })
        //else
        //    res.redirect('/home?access=denied')
    })
});

// Rota de Cadastro de Usuários
router.get('/register', (req,res) => {
    req.user.then(user => {
        //if(user.eAdmin)
            res.render('users/register', { 
                userName: null,
                eAdmin: user.eAdmin
            })
        //else
        //    res.redirect('/home?access=denied')
    })
});

router.post('/register', async(req,res) => {
    const userName = req.body.userName;
    const email = req.body.email;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);

    const user = new Users({ userName, email, password });

    try{
        await user.save();
        res.redirect('/users');
    }catch (err){
        next(err)
    }
})

// Rota de Utualização de Dados de Usuário
router.get('/update/:id', async(req,res) => {
    const id = req.params.id;

    const doc = await Users.findOne({ _id: id });
    
    req.user.then(user => {
        //if(user.eAdmin)
            res.render('users/update', { 
                doc: doc, 
                userName: null,
                eAdmin: user.eAdmin
            })
        //else
        //    res.redirect('/home?access=denied')
    })
})

router.post('/update/:id', async(req,res) => {
    const id = { _id: req.params.id};
    const update = {
        userName: req.body.userName,
        email: req.body.email,
        eAuthor: req.body.eAuthor
    }

    try{
        await Users.findOneAndUpdate(id, update);
        res.redirect('/users');
    }catch (err){
        next(err)
    }
})

// Rota de Exclusão de Usuários
router.get('/delete/:id', async(req,res,next) => {
    const id = req.params.id;

    try{
        await Users.findByIdAndDelete(id);
        res.redirect('/users')
    }catch(err){
        next(err)
    }
})

module.exports = router