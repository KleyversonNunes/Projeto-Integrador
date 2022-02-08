const express = require('express');
const router = express.Router();
const passport = require('passport');

// Rota para login de usuários
router.get('/', (req,res,next) => {
    if(req.query.fail)
        res.render('pages/login', { warning: 'Usuário e/ou senha incorretos!', alertType: 'danger' });
    else if(req.query.access)
        res.render('pages/login', { warning: 'Efetue login para ter acesso a essa rota!!!', alertType: 'danger' })
    else if(req.query.signup)
        res.render('pages/login', { warning: 'Novo usuário cadastrado com sucesso !!!', alertType: 'success' })
    else if(req.query.forgot)
        res.render('pages/login', { warning: 'Senha alterada com sucesso !', alertType: 'success' } )
    else if(req.query.logout)
        res.render('pages/login', { warning: 'Volte sempre!', alertType: 'success' })
    else
        res.render('pages/login', { warning: null })
})

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login?fail=true'
    })
)

module.exports = router

