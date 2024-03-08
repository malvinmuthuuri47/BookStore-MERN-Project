const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Book = require('./models/bookModel.js')
const booksRoute = require('./routes/booksRoute.js')

require('dotenv').config()

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS Policy
// Option 1: Allows all Origins with default of cors(*)
// app.use(cors())
// Option 2: Allows Custom Origins
app.use(
    cors({
        origin: <Your CORS address>,
        methods: ['Accepted methods by the server'],
        allowedHeaders: ['Content-Type']
    })
)

// Middleware for routes
app.use('/books', booksRoute)

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Welcome to MERN Stack Tutorial')
})

mongoose.connect(process.env.MongoDbURL)
.then(() => {
    console.log('App successfully connected to the database!')
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error(err)
})
