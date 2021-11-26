const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 200 },
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories:[{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    author:{ type: Schema.Types.ObjectId, ref: 'User'}
})
module.exports = model('Cube', schema)