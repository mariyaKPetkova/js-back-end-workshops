module.exports = {
    details: async (req, res) => {
        const cube = await req.storage.getById(req.params.id)

        if (cube === undefined) {
            res.redirect('/404')
        } else {
            const ctx = {
                title: 'Cubicle',
                cube
            }
            res.render('details', ctx)
        }

    },
    async attach(req, res) {
        const cube = await req.storage.getById(req.params.id)
        const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a => a._id))
        res.render('attach', {
            title: 'Attach Accessories',
            cube,
            accessories
        })
    },
    async attachPost(req, res) {
        const stickerId = req.body.accessory
        const cubeId = req.params.cubeId
        await req.storage.attachStickers(cubeId, stickerId)
        res.redirect(`/details/${cubeId}`)
    }
}