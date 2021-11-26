const Accessory = require('../models/Accessory.js')

async function getAllAccessories(existing){
    return Accessory.find({ _id:{$nin: existing}}).lean()
}
async function createAccessory(accessory){
    const record = new Accessory(accessory)
    return record.save()
}

module.exports = {
    getAllAccessories,
    createAccessory
}
