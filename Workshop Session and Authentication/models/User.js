const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { type: String, require: true },
    hashPassword: { type: String, require: true }
})

module.exports = model('User', schema)