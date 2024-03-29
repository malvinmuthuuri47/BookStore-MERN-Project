const express = require('express')
const Book = require('../models/bookModel.js')

const router = express.Router()

// Route for saving a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: 'Please ensure you have entered all the required fields: title, author, publishYear and try again'})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
})

// Route for getting all books from the database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({ message: err.message})
    }
})

// Route for getting the details of a single book from the Db by Id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
})

// Route for updating a book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Please ensure you have entered all the required fields: title, author, publishYear'
            })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result){
            return res.status(404).json({ message: 'Book not found' })
        }

        return res.status(200).send({ message: 'Book updated successfully!' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ message: err.message })
    }
})

// Route for deleting a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({ message: 'Book not found' })
        }

        return res.status(200).send({ message: 'Book deleted successfully!' })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
})

module.exports = router