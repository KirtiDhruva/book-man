const mongoose = require('mongoose')

module.exports = (dbURL) => {
  mongoose.set('strictQuery', true)

  mongoose.connect(dbURL)

  mongoose.connection.on('connected', () => {
    console.info('MongoDB Connected')
  })

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB', err.message)
  })

  mongoose.connection.on('error', () => {
    console.error('MongoDB Disconnected')
  })

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })
}
