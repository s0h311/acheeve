import Joi from 'joi'
import { useI18n } from 'vue-i18n'

// Der String muss mindestens 8 Zeichen lang sein
// Der String muss mindestens eine Ziffer und ein Sonderzeichen enthalten und darf nur aus Buchstaben,
// Ziffern und den angegebenen Sonderzeichen bestehen
// Der String ist eine Pflichtangabe

const schema = Joi.string().min(8).pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')).required()

// Validiere das Passwort anhand des Joi-Schemas
// Hole die useI18n-Funktion, um Sprachressourcen abzurufen
export default (password: string) => {
  const { error } = schema.validate(password)
  const { t } = useI18n()

  // Wenn ein Validierungsfehler auftritt
  if (error) {
    const errorMessage = error.details[0].message // Hole die erste Fehlermeldung des Validierungsfehlers
    // Wenn der Fehler eine Längenbeschränkung betrifft
    if (errorMessage.includes('length')) {
      // Gib die entsprechende Fehlermeldung und das betroffene Feld zurück
      return t('error_password_length')
    }

    if (errorMessage.includes('pattern')) {
      // Wenn der Fehler ein falsches Muster betrifft
      return t('error_password_pattern')
    }
    return null
  }
  // Wenn keine Fehler auftreten, gib null zurück und das betroffene Feld
  return null
}
