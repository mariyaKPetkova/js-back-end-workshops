const { about } = require('../controllers/about.js');
const { catalog } = require('../controllers/catalog.js');
const { create, post: createPost } = require('../controllers/create.js');
const { details, attach, attachPost } = require('../controllers/details.js');
const { notFound } = require('../controllers/notFound.js');
const { edit, post: editPost } = require('../controllers/edit.js');
const { post: commentPost } = require('../controllers/comments.js');
const { createAccessory,postAccessory } = require('../controllers/accessory.js');

module.exports = (app) => {
    app.get('/', catalog)
    app.get('/about', about)
    app.get('/details/:id', details)
    app.get('/create', create)
    app.post('/create', createPost)

    app.get('/edit/:id', edit)
    app.post('/edit/:id', editPost)

    app.post('/comments/:cubeId/create', commentPost)
    app.get('/accessory/create', createAccessory)
    app.post('/accessory/create', postAccessory)
    app.get('/details/:id/attach', attach)
    app.post('/details/:cubeId/attach', attachPost)

    app.all('*', notFound)
}