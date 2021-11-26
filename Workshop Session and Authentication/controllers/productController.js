const { Router } = require('express')
const { isAuth, isOwner } = require('../middlewares/guards.js')
const { preloadCube } = require('../middlewares/preload.js')

const router = Router()

router.get('/', async (req, res) => {
    const cubes = await req.storage.getAll(req.query)
    const ctx = {
        title: 'Cubicle',
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || '',
    }
    res.render('index', ctx)
})

router.get('/create', isAuth(), (req, res) => {
    res.render('create', { title: 'Create' })
})
router.post('/create', isAuth(), async (req, res) => {

    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel),
        author: req.user._id
    }
    try {
        await req.storage.create(cube)
    } catch (err) {
        if (err.name == 'ValidationError') {
            return res.render('create', { title: 'Create', error: 'All fields are required' })
        }
    }

    res.redirect('/')
})

router.get('/details/:id',preloadCube(), async (req, res) => {
    //console.log(req.data)
    const cube = req.data.cube

    if (cube === undefined) {
        res.redirect('/404')
    } else {
        cube.isOwner = req.user && (cube.authorId == req.user._id)
        const ctx = {
            title: 'Cubicle',
            cube
        }
        res.render('details', ctx)
    }

})

router.get('/edit/:id', preloadCube(), isOwner(), async (req, res) => {
    const cube = req.data.cube

    if (!cube) {
        res.redirect('/404')
    } else {
        cube[`select${cube.difficultyLevel}`] = true
        const ctx = {
            title: 'Edit Cube',
            cube
        }
        res.render('edit', ctx)
    }
})
router.post('/edit/:id', preloadCube(), isOwner(), async (req, res) => {
    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    }
    await req.storage.edit(req.params.id, cube)
    res.redirect('/')
})

router.get('/attach/:cubeId', async (req, res) => {
    
    const cube = await req.storage.getById(req.params.cubeId)
    const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id))
    res.render('attach', {
        title: 'Attach Accessories',
        cube,
        accessories
    })
})
router.post('/attach/:cubeId', async (req, res) => {
    const stickerId = req.body.accessory
    const cubeId = req.params.cubeId
    await req.storage.attachStickers(cubeId, stickerId)
    res.redirect(`/products/details/${cubeId}`)
})

module.exports = router
