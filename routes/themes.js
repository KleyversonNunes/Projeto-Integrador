const express = require('express');
const router = express.Router();

// Importando o mongoose
const { Mongoose } = require('../db');

// Importa o model de Temas
require('../models/Themes');

// Monta o model de Temas
const Themes = Mongoose.model('themes')

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
router.get('/add', (req,res) => {
    req.user.then(user => {
        if(user.eAuthor)
            res.render('author/addThemes', { 
                userName: user.userName,
                eAdmin: user.eAdmin
            })
        else
            res.redirect('/themes?author=false');
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
router.get('/update/:slug', async (req,res) => {
    const slug = req.params.slug;

    const theme = await Themes.findOne({slug: slug});

    req.user.then(user => {
        res.render('author/updateThemes', {
            userName: user.userName,
            eAdmin: user.eAdmin,
            theme: theme
        })
    })
})

router.post('/update/:slug', async (req,res,next) => {
    const update = {
        name: req.body.name,
        slug: req.body.slug
    }

    try{
        await Themes.findOneAndUpdate({ slug: req.params.slug }, update );
        res.redirect('/themes')
    }catch(err){
        next(err)
    }
})

// Rota para deletar tema
router.get('/delete/:slug', async (req,res,next) => {
    const slug = req.params.slug;

    try{
        await Themes.findOneAndDelete({ slug: slug });
        res.redirect('/themes')
    }catch(err){
        next(err)
    }
})

module.exports = router;