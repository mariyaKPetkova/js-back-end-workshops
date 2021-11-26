const { Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type:String, required:true,maxlength:80},
    description:{type:String, required:true,maxlength:80},
    imageUrl:{type:String, required:true,match: /^https?:\/\//}
})

module.exports =  model('Accessory',schema)