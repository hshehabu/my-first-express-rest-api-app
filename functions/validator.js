const Joi = require("joi");

function validate(course) {
    const schema = {
      name: Joi.string().min(3).required(),
    };
    return Joi.validate(course, schema);
  }
module.exports= validate;