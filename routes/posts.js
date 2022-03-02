const express = require('express');
const router = express.Router();

// Importando o Mongoose
//const { Mongoose } = require('../db');
const Mongoose = require('mongoose');

// Importando o model de artigos
require('../models/Posts');
// Importando o model de temas
require('../models/Themes');

// Montando o model de postagens
const Posts = Mongoose.model('posts');
// Montando o model de temas
const Themes = Mongoose.model('themes')

// Verifica se o usuário logadp é um autor
function eAuthorMiddleware(req, res, next){
    req.user.then(user => {
        if(user.eAuthor) return next();
        res.redirect('/posts?author=false')
    })
}

// -------------------  Rota de artigos ------------------

// Rota para listar todos os posts
router.get('/', async (req,res) => {
    const posts = await Posts.find().sort({'publicationDate': 'desc'});

    req.user.then(user => {
        if(req.query.author){
            res.render('author/posts', { 
                posts: posts,
                userName: user.userName,
                eAuthor: user.eAuthor,
                eAdmin: user.eAdmin,
                warning: 'É necessário ser um autor para acessar essa rota. Para mais informações fale com o ADM.',
                alertType: 'danger'
            })
        }else{
            res.render('author/posts', { 
                posts: posts,
                userName: user.userName,
                eAdmin: user.eAdmin,
                eAuthor: user.eAuthor,
                warning: null
            })
        }
    })
})

// Rota para adicionar posts
router.get('/add', eAuthorMiddleware, async (req,res) => {
    const themes = await Themes.find();

    req.user.then(user => {
            res.render('author/addPosts', {
                userName: user.userName,
                eAdmin: user.eAdmin,
                themes: themes
            })
    })
})

router.post('/add', async (req,res,next) => {
    const title = req.body.title;
    const theme = req.body.theme;
    const type = req.body.type;
    const author = req.body.author;
    const description = req.body.description;

    // Variáveis auxiliares
    const data = [];
    let aux = {};
    let id = 1;

    // Removendo as propriedades desnecessárias do conteúdo
    const contents = req.body;
    delete contents.title;
    delete contents.author;
    delete contents.theme;
    delete contents.type;
    delete contents.description;

    // Criando um array com as propriedades dos conteúdos
    const keys = Object.keys(contents);

    /*
        Organizando os elementos e as suas respectivas propriedades 
        em uma lista de objetos
    */
    keys.forEach((key,index) => {
        if(key == `element${id}`){
            aux['type'] = contents[key];
            aux['prop1'] = contents[keys[index+1]];
            if(contents[key] == 'img'){
                aux['prop2'] = contents[keys[index+2]];
            }
            data.push(aux);
            aux = {};
            id++
        }
    })

    // Organizando e salvando as informações do formulário no banco de dados
    const post = new Posts({ title, author, theme, type, description, data });

    try{
        await post.save();
        res.redirect('/posts')
    }catch(err){
        next(err)
    }
})

// Exibir postagem em sua devida página
router.get('/:id', async(req,res,next) => {
    try{
        const post = await Posts.findById(req.params.id);
        const theme = await Themes.findById(post.theme);

        req.user.then(user => {
            res.render('author/showPosts', {
                title: post.title,
                author: post.author,
                theme: theme.name,
                slug: theme.slug,
                type: post.type,
                //contents: contents,
                description: post.description,
                data: post.data,
                userName: user.userName,
                eAdmin: user.eAdmin
            })
        })
    }catch(err){
        next(err);
        res.redirect('/home')
    }
})

// Exibir uma lista de artigos publicador por um determinado autor
router.get('/author/:author', async (req,res) => {
    const author = req.params.author;

    const posts = await Posts.find({ author: author });

    if(posts.length){
        req.user.then(user => {
            res.render('author/postsByAuthor', {
                posts: posts,
                author: author,
                userName: user.userName,
                eAdmin: user.eAdmin
            })
        })
    }else{
        res.redirect('/posts')
    }
})

// Exibir uma lista de posts de acordo com o tipo
router.get('/type/:type', async (req,res) => {
    const type = req.params.type;

    if(type == 'Artigos' || type == 'Tutoriais' || type == 'Informes'){
        const posts = await Posts.find({type: type});

        req.user.then(user => {
            res.render('author/postsByType', {
                posts: posts,
                type: type,
                userName: user.userName,
                eAdmin: user.eAdmin
            })
        })
    }else{
        res.redirect('/home')
    }
})

// Exibir uma lista de posts de acordo com o tema
router.get('/theme/:slug', async (req, res, next) => {
    const slug = req.params.slug;
    
    const theme = await Themes.findOne({slug: slug});

    //const posts = await Posts.find({theme: theme[0].id});
    
    try{
        const posts = await Posts.find({theme: theme.id});

        req.user.then(user => {
            res.render('author/postsByTheme', {
                //theme: theme[0].name,
                theme: theme.name,
                posts: posts,
                userName: user.userName,
                eAdmin: user.eAdmin
            })
        })
    }catch(err){
        next(err);
        res.redirect('/themes')
    }
})

// Rota para deletar postagens
router.get('/delete/:id', async (req,res,next) => {
    try{
        await Posts.findByIdAndDelete(req.params.id);
        res.redirect('/posts')
    }catch(err){
        next(err)
    } 
})

// exportando as rotas com a path 'posts'
module.exports = router;