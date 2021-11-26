module.exports = {
    create: (req, res) => {
        res.render('create', { title: 'Create' })
    },
    post: async (req, res) => {

        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: Number(req.body.difficultyLevel)
        }
        try {
            await req.storage.create(cube)
        } catch (err) {
            if(err.name == 'ValidationError'){
                return res.render('create', { title: 'Create' , error: 'All fields are required'})
            }
        }

        res.redirect('/')
    }
}