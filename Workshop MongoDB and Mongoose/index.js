const express = require('express');
const { init: storage } = require('./services/storage.js')
const databaseConfig = require('./config/database.js')

start()

async function start() {

    const port = 3000;
    const app = express();

    require('./config/express.js')(app)
    await databaseConfig(app)
    app.use(await storage())
    require('./config/routes.js')(app)
    

    app.listen(port, () => console.log(`Server on ${port}`));
}