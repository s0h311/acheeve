import Joi from 'joi'

const schema = Joi.string().min(8).max(25).required()

export default (password: string) => {
  return schema.validate(password)
}
