const Joi = require('joi')

let fieldValidations = {
  title: Joi.string().trim().min(2).max(150).required(),
  author: Joi.string().trim().min(2).max(100).required(),
  summary: Joi.string().trim().min(0).max(500),
}

module.exports = {
  bookSchema: Joi.object({
    title: fieldValidations.title,
    author: fieldValidations.author,
    summary: fieldValidations.summary,
  }).options({ allowUnknown: false, abortEarly: true }),
}
