const Cube = require('../models/Cube.js')
const Comment = require('../models/Comments.js')
const Accessory = require('../models/Accessory.js')
async function init() {

    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit,
            createComment,
            createAccessory,
            getAllAccessories,
            attachStickers
        }
        next()
    }
}
async function getAll(query) {
    const options = {}

    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' }
    }
    if (query.from) {
        options.difficultyLevel = { $gte: Number(query.from) }
    }
    if (query.to) {
        options.difficultyLevel = options.difficultyLevel || {}
        options.difficultyLevel.$lte= Number(query.to) 
    }
    const cubes = Cube.find(options).lean()
    return cubes
}
async function getById(id) {
    const cube = await Cube.findById(id).populate('comments').populate('accessories').lean()
    if (cube) {
        return cube
    } else {
        return undefined
    }
}

async function create(cube) {
    const record = new Cube(cube);
    return record.save()
}

async function edit(id, cube) {
    const existing = await Cube.findById(id)

    if (!existing) {
        throw new ReferenceError('No cube')
    }

    Object.assign(existing, cube)
    return existing.save()
}

async function persist() {
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2))
    } catch (err) {
        console.error('Error writing out database')
    }
}
async function createComment(cubeId,comment){
    const cube = await Cube.findById(cubeId)
    if(!cube){
        throw new ReferenceError('No such ID in DB')
    }
    const newComment = new Comment(comment)
    await newComment.save()

    //console.log(newComment)
    cube.comments.push(newComment)
    await cube.save()
}
async function getAllAccessories(existing){
    return Accessory.find({ _id:{$nin: existing}}).lean()
}
async function createAccessory(accessory){
    const record = new Accessory(accessory)
    return record.save()
}
async function attachStickers(cubeId,stickerId){
    const cube = await Cube.findById(cubeId)
    const sticker = await Accessory.findById(stickerId)
    
    if(!cube || !sticker){
        throw new ReferenceError('No such ID in DB')
    }

    cube.accessories.push(sticker)
    return cube.save()
}

module.exports = {
    init,
    // getAll,
    // getById,
    // create,
    //edit,
    //createComment,
    //createAccessory,
    //getAllAccessories,
    //attachStickers
}
