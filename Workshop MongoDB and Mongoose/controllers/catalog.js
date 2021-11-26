module.exports = {
    catalog: async (req, res) => {
        const cubes = await req.storage.getAll(req.query)
        const ctx = {
            title: 'Cubicle',
            cubes,
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || '',
        }
        console.log(ctx);
        res.render('index', ctx)
    }
}