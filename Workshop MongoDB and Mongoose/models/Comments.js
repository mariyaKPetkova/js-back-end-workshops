const { Schema, model } = require('mongoose')

const schema = new Schema({
    author: { type: String, required: true, maxlength: 30 },
    content: { type: String, required: true, maxlength: 100 }
})

module.exports = model('Comment', schema)