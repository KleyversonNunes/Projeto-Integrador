const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true
    }
})

mongoose.model('themes', themeSchema)













