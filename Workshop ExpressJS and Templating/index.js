const express = require('express');
const hbs = require('express-handlebars');

const { init: storage } = require('./models/storage.js')

const { about } = require('./controllers/about.js');
const { catalog } = require('./controllers/catalog.js');
const { create, post: createPost } = require('./controllers/create.js');
const { details } = require('./controllers/details.js');
const { notFound } = require('./controllers/notFound.js');
const { edit, post: editPost } = require('./controllers/edit.js');

start()

async function start() {

    const port = 3000;
    const app = express();

    app.engine('hbs', hbs({ extname: '.hbs' }))
    app.set('view engine', 'hbs')

    app.use('/static', express.static('static'))  //middleware
    app.use(express.urlencoded({ extended: false }))
    app.use(await storage())


    app.get('/', catalog)
    app.get('/about', about)
    app.get('/details/:id', details)
    app.get('/create', create)
    app.post('/create', createPost)

    app.get('/edit/:id', edit)
    app.post('/edit/:id', editPost)

    app.all('*', notFound)

    app.listen(port, () => console.log(`Server on ${port}`));
}