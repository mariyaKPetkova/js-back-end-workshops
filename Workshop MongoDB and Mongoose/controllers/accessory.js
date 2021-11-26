module.exports = {
    createAccessory(req,res){
        res.render('createAccessory',{title:'Create an Accessory'})
    },
    async postAccessory(req,res){
        const accessory = {
            name:req.body.name,
            description:req.body.description,
            imageUrl:req.body.imageUrl
        }
        await req.storage.createAccessory(accessory)
        res.redirect('/')
    }
}