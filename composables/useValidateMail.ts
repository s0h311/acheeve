import Joi from 'joi'

const schema = Joi.string().email({ tlds: { allow: false } })

export default (email: string): string | null => {
  const { error } = schema.validate(email)

  if (error) {
    const errorMessage = error.details[0].type

    if (errorMessage.includes('string.email')) {
      return 'validation_error_email_invalid'
    }

    if (errorMessage.includes('string.empty')) {
      return 'validation_error_email_required'
    }
    return 'validation_error_other'
  }
  return null
}
