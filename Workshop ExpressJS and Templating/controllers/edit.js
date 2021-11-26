module.exports = {
    async edit (req, res) {
        const cube = await req.storage.getById(req.params.id)
        cube[`select${cube.difficultyLevel}`] = true
        if(!cube){
            res.redirect('404')
        }else{
            const ctx = {
                title:'Edit Cube',
                cube
            }
            res.render('edit', ctx)
        }
    },
    async post (req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: Number(req.body.difficultyLevel)
        }
        await req.storage.edit(req.params.id, cube)
        res.redirect('/')
    }
}