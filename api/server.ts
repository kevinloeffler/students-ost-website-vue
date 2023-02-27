import express from 'express'
import cors from 'cors'
import {databaseManager} from './DatabaseManager.js'

const port = process.env.PORT || 3000

const corsOptions = {
    // TODO: add origin for production server
    origin: 'http://localhost:5173'
}

const app = express()
app.use(cors(corsOptions))

/***** ROUTES *****/

app.get('/api/hello', function(req, res) {
    res.json({hello: 'Hello World'})
})

app.get('/api/events', async function (req, res) {
    // TODO: use a query param to specify the number of events
    res.json(await databaseManager.getNextEvents())
})


/***** START SERVER *****/

app.listen(port, function () {
    console.log('API is listening on port ' + port);
})
