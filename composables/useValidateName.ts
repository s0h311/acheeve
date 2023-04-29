import Joi from 'joi'
import { useI18n } from 'vue-i18n'

const schema = Joi.string().min(2).required()

export default function validateName(name: string): string | null {
  const { error } = schema.validate(name)
  const { t } = useI18n()

  if (error) {
    const errorMessage = error.details[0].message

    if (errorMessage.includes('length')) {
      return t('error_name_length')
    }

    if (errorMessage.includes('empty')) {
      return t('error_name_required')
    }
    return null
  }

  return null
}
