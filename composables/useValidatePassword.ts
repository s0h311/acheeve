import Joi from 'joi'

const schema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .required()

export default (password: string): string | null => {
  const { error } = schema.validate(password)

  if (error) {
    const errorMessage = error.details[0].type
    if (errorMessage.includes('string.min')) {
      return 'validation_error_password_length'
    }

    if (errorMessage.includes('string.pattern.base')) {
      return 'validation_error_password_pattern'
    }

    if (errorMessage.includes('string.empty')) {
      return 'validation_error_password_required'
    }
    return 'validation_error_password_other'
  }
  return null
}
