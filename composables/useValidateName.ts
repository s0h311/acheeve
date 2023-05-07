import Joi from 'joi'

const schema = Joi.string().min(2).required()

export default (name: string): string | null => {
  const { error } = schema.validate(name)

  if (error) {
    const errorMessage = error.details[0].type

    if (errorMessage.includes('string.min')) {
      return 'validation_error_name_length'
    }

    if (errorMessage.includes('string.empty')) {
      return 'validation_error_name_required'
    }
    return 'validation_error_name_other'
  }

  return null
}
