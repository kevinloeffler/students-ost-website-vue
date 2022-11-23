import express from 'express'

const port = process.env.PORT || 3000

const app = express()

/***** ROUTES *****/

app.get('/api/hello', function(req, res) {
    res.json({hello: 'Hello World'})
})


/***** START SERVER *****/

app.listen(port, function () {
    console.log('API is listening on port ' + port);
})
