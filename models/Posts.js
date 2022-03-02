const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String, required: true
    },
    author: {
        type: String, required: true
    },
    publicationDate: {
        type: Date, default: Date.now()
    },
    type: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    data: {
        type: Array,
        required: true
    },
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'themes',
        required: true
    }
})
mongoose.model('posts', postSchema)


