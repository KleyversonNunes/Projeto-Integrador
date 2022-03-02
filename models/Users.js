const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        eAuthor: {
            type: Number,
            default: 0 // Zero indica que não é autor
        },
        eAdmin: {
            type: Number,
            default: 0 // Zero indica que não é administrador
        }
    }
)

mongoose.model('users', userSchema)