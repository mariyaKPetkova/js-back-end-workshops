const express = require('express');
const storage = require('./middlewares/storage.js')
const databaseConfig = require('./config/database.js')

start()

async function start() {

    const port = 3000;
    const app = express();
    await databaseConfig(app)
    require('./config/express.js')(app)


    app.use(await storage())
    require('./config/routes.js')(app)


    app.listen(port, () => console.log(`Server on ${port}`));
}