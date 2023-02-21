import express from 'express'
import {databaseManager} from './DatabaseManager.js'

const res = await databaseManager.getNextEvents()
// console.log('DB Response:', res)
console.log('First Event ID:', res?.[0].eventId)

const port = process.env.PORT || 3000

const app = express()

/***** ROUTES *****/

app.get('/api/hello', function(req, res) {
    res.json({hello: 'Hello World'})
})

app.get('/api/events', async function (req, res) {
    res.json(await databaseManager.getNextEvents())
})


/***** START SERVER *****/

app.listen(port, function () {
    console.log('API is listening on port ' + port);
})
