import Joi from 'joi'

const schema = Joi.string()
  .min(8)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .required()

export default (password: string): string | null => {
  const { error } = schema.validate(password)

  if (error) {
    console.log(error.details[0].type)

    const errorMessage = error.details[0].type
    if (errorMessage.includes('string.min')) {
      return 'validation_error_password_length'
    }

    if (errorMessage.includes('string.pattern.base')) {
      return 'validation_error_password_pattern'
    }
    return 'validation_error_other'
  }
  return null
}
