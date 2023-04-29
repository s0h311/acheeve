import Joi from 'joi'
import { useI18n } from 'vue-i18n'

const schema = Joi.string()
  .email({ tlds: { allow: false } })
  .required()

export default function validateEmail(email: string): string | null {
  const { error } = schema.validate(email)
  const { t } = useI18n()

  if (error) {
    const errorMessage = error.details[0].message

    if (errorMessage.includes('email')) {
      return t('error_email_invalid')
    }

    if (errorMessage.includes('empty')) {
      return t('error_email_required')
    }
    return null
  }

  return null
}
