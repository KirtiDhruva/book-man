const createError = require('http-errors')
const Library = require('../models/LibraryModel')
const { bookSchema } = require('../validators')

module.exports = {
  fetchBook: (req, res, next) => {
    let id = req.params.id

    if (!id) return next(createError.NotFound('Invalid book id'))

    return Library.findById(id)
      .then((book) => {
        if (!book) throw createError.NotFound(`Book with id: ${id} not found`)

        res.json({ book })
      })
      .catch((err) => next(err))
  },

  fetchAll: (req, res, next) => {
    let page = Math.max(0, req.query.page) //always >= 0 and first page by default
    let limit = Math.max(1, req.query.limit ?? 10) //always >= 1  and 10 results by default

    return Library.find()
      .skip(limit * page)
      .limit(limit)
      .then((books) => res.json({ books }))
      .catch((err) => next(err))
  },

  addBook: async (req, res, next) => {
    try {
      const sanitizedBody = await bookSchema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: false,
      })

      let book = await Library.create(sanitizedBody)

      if (!book)
        throw createError.InternalServerError(
          `Unable to add book with title: '${sanitizedBody.title}' to the database. Please try after sometime...`
        )

      res.status(200).send()
    } catch (err) {
      if (err.isJoi === true) {
        err.status = 422
        err.message = err.details
        console.error(err)
      }
      next(err)
    }
  },

  updateBook: async (req, res, next) => {
    let id = req.params.id

    if (!id) return next(createError.NotFound('Invalid book id'))

    try {
      const sanitizedBody = await bookSchema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: false,
      })

      let book = await Library.findByIdAndUpdate(id, sanitizedBody, {
        new: true,
      })

      if (!book) throw createError.NotFound(`Book with id: ${id} not found`)

      res.status(200).send()
    } catch (err) {
      if (err.isJoi === true) {
        err.status = 422
        err.message = err.details
        console.error(err)
      }
      next(err)
    }
  },

  deleteBook: (req, res, next) => {
    let id = req.params.id

    if (!id) return next(createError.NotFound('Invalid book id'))

    return Library.findOneAndDelete({ _id: id })
      .then((book) => {
        if (!book) throw createError.NotFound(`Book with id: ${id} not found`)

        res.status(200).send()
      })
      .catch((err) => next(err))
  },

  deleteAll: (req, res, next) =>
    Library.deleteMany()
      .then((_) => res.status(200).send())
      .catch((err) => next(err)),
}
