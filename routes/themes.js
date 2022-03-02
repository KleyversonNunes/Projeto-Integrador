const express = require('express');
const router = express.Router();

// Importando o mongoose
//const { Mongoose } = require('../db');
const Mongoose = require('mongoose');

// Importa o model de Temas
require('../models/Themes');

// Monta o model de Temas
const Themes = Mongoose.model('themes')

function eAuthorMiddleware(req, res, next){
    req.user.then(user => {
        if(user.eAuthor) return next();
        res.redirect('/themes?author=false')
    })
}

// -------------------   Rota para temas   ----------------------
router.get('/', async (req,res) => {
    const docs = await Themes.find();

    req.user.then(user => {
        if(req.query.author)
            res.render('author/themes', { 
                themes: docs, 
                userName: user.userName,
                eAdmin: user.eAdmin,
                eAuthor: user.eAuthor,
                warning: 'É necessário ser um autor para acessar essa rota. Para mais informações fale com o ADM.',
                alertType: 'danger'
            })
        else
            res.render('author/themes', { 
                themes: docs, 
                userName: user.userName,
                eAdmin: user.eAdmin,
                eAuthor: user.eAuthor,
                warning: null
            })
    })
})

// Rota para adicionar os temas
router.get('/add', eAuthorMiddleware, (req,res) => {
    req.user.then(user => {
        res.render('author/addThemes', { 
            userName: user.userName,
            eAdmin: user.eAdmin
        })
    })
})

router.post('/add', async (req,res,next) => {
    const path = req.query.path;
    const name = req.body.name;
    const slug = req.body.slug;

    const theme = new Themes({ name, slug })

    try{
        await theme.save();
        if(path === '0'){
            res.redirect('/themes')
        }else if(path === '1'){
            res.redirect('/posts/add')
        }
    }catch(err){
        console.log(err);
        next(error)
    }

})

// Rota para editar os temas
router.get('/update/:id', eAuthorMiddleware, async (req,res,next) => {
    const id = req.params.id;
    
    try{
        const theme = await Themes.findOne({ _id: id });
        req.user.then(user => {
            res.render('author/updateThemes', {
                userName: user.userName,
                eAdmin: user.eAdmin,
                theme: theme
            })
        })
    }catch(err){
        next(err)
        res.redirect('/themes')
    }
})

router.post('/update/:id', async (req,res,next) => {
    const update = {
        name: req.body.name,
        slug: req.body.slug
    }

    try{
        await Themes.findOneAndUpdate({ _id: req.params.id }, update );
        res.redirect('/themes')
    }catch(err){
        next(err)
    }
})

// Rota para deletar tema
router.get('/delete/:id', eAuthorMiddleware, async (req,res,next) => {
    const id = req.params.id;

    try{
        await Themes.findOneAndDelete({ _id: id });
        res.redirect('/themes')
    }catch(err){
        next(err)
        res.redirect('/themes')
    }
})

module.exports = router;