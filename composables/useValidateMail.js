import Joi from 'joi'

const schema = Joi.string().email({ tlds: { allow: false } })

export default (email) => {
  return schema.validate(email)
}
