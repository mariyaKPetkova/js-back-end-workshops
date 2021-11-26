const express = require('express');
const hbs = require('express-handlebars');

const cookieParser = require('cookie-parser')
const auth = require('../middlewares/auth.js')

module.exports = (app) => {
    app.engine('hbs', hbs({ extname: '.hbs' }))
    app.set('view engine', 'hbs')

    app.use('/static', express.static('static'))  //middleware
    app.use(express.urlencoded({ extended: false }))

    app.use(cookieParser())
    app.use(auth())
}