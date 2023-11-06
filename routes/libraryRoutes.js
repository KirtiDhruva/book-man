const express = require('express')
const LibraryController = require('../controllers/LibraryController')
const libraryRouter = express.Router()

libraryRouter.get('/all', LibraryController.fetchAll)
libraryRouter.get('/:id', LibraryController.fetchBook)

libraryRouter.post('/add', LibraryController.addBook)

libraryRouter.patch('/update/:id', LibraryController.updateBook)

libraryRouter.delete('/all', LibraryController.deleteAll)
libraryRouter.delete('/:id', LibraryController.deleteBook)

module.exports = {
  path: '/library',
  router: libraryRouter,
}
