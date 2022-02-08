const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/projeto_integrador');

module.exports = { Mongoose: mongoose }