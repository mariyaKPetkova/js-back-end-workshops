
const User = require('../models/User.js')

async function createUser(username,hashPassword) {
    
    const user = new User({
        username,
        hashPassword
    })
    await user.save()
    return user
}
async function getUserByUsername(username){
 return await User.findOne({username:{$regex: username, $options: 'i'}})
}
module.exports = {
    createUser,
    getUserByUsername
}