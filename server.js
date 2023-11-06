require('dotenv').config()
const express = require('express')
const createError = require('http-errors')

require('./services/initMongoDb')(process.env.DATABASE_URL)

const app = express()

app.use(express.json({ limit: '50mb' }))

const {
  path: libraryPath,
  router: libraryRouter,
} = require('./routes/libraryRoutes')

app.use(`/api/v1${libraryPath}`, libraryRouter)

//Catch-all route
app.use((req, res, next) => next(createError.NotFound('Resource Not Found')))

//Middleware to send errors properly
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.ENVIRONMENT === 'development' ? 3000 : 80

app.listen(PORT, (err) => {
  if (err) return console.err(`Error starting server on port ${PORT}.`)

  console.info(
    `REST API Server running on ${PORT} in ${
      process.env.ENVIRONMENT ?? 'production'
    } mode`
  )
})
