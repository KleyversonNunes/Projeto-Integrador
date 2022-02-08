const express = require('express');
const app = express();

// Importando rotas de arquivos separados
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const forgotRouter = require('./routes/forgot');
const logoutRouter = require('./routes/logout');
const postsRouter = require('./routes/posts');
const themesRouter = require('./routes/themes');
const userRouter = require('./routes/user');

// Definindo o EJS como view engine do projeto
app.set('view engine', 'ejs');

// Definindo a pasta public como diretório para arquivos estáticos
app.use(express.static(__dirname + '/public'));

// Utilizando métodos nativos do express para receber dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importando o Passport e configurando a sessão
const session = require('express-session');
const passport = require('passport');
require('./auth')(passport);
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 Hora
}));

app.use(passport.initialize());
app.use(passport.session());

// Função que não permite que páginas internas serem acessadas sem login
function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/login?access=false');
}

// Definindo as rotas do site
  // Página de Login
  app.use('/login', loginRouter);
  // Página de Cadastro
  app.use('/signup', signupRouter);
  // Página de Alteração de Senha
  app.use('/forgot', forgotRouter);
  // Rota para Deslogar Conta
  app.use('/logout', logoutRouter);

  app.get('/', (req,res) => {
      res.redirect('/login')
  })
  // Página Inicial
  app.get('/home', authenticationMiddleware, async (req,res) => {
    const { Mongoose } = require('./db');

    // Montando o model de postagens
    const Posts = Mongoose.model('posts');
    const posts = await Posts.find().sort({'publicationDate': 'desc'});

    req.user.then(user => {
        if(req.query.access)
            res.render('pages/home', {
                posts: posts,
                userName: user.userName,
                eAdmin: user.eAdmin, 
                warning: "Somente o ADM pode acessar essa rota",
                alertType: "danger"
            })
        else
            res.render('pages/home', {
                posts: posts,
                userName: user.userName,
                eAdmin: user.eAdmin, 
                warning: null
            })
    })
  })
  // Rota para Postagens
  app.use('/posts', postsRouter);
  // Rota para Temas
  app.use('/themes', themesRouter);
  
  // Página de Contato do desenvolvedor
  app.get('/contact', authenticationMiddleware, (req,res) => {
    req.user.then(user => {
        res.render('pages/contact', { 
            userName: user.userName,
            eAdmin: user.eAdmin
        })
    })
  })

  // Página sobre informações do site
  app.get('/about', authenticationMiddleware, (req,res) => {
    req.user.then(user => {
        res.render('pages/about', { 
            userName: user.userName,
            eAdmin: user.eAdmin
        })
    })
  })
  // Rota para gerenciamento de usuários
  app.use('/users', userRouter);

  // Rota para tratamento de erro 404
  app.use((req,res,next) => {
      res.status(404).render('pages/error', {error: req.url})
  })

// Definido a porta onde o servidor local executará
app.listen(8000, () => {
    console.log('Servidor ligado na porta 8000');
})

