const mongoose = require('mongoose')
module.exports = (app) => {
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/cubicle')
    const db = mongoose.connection
    db.on('erorr', err => {
        console.log('DB ERR:' + err.message);
        reject(err.message)
    })
    db.once('open',()=>{
        console.log('DB connected');
        resolve()
    })
    })
    
}