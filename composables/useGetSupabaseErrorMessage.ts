import { PostgrestError } from 'node_modules/@supabase/postgrest-js/'
import { AuthError } from 'node_modules/@supabase/gotrue-js/'

export default (error: Error | PostgrestError | AuthError): string => {
  return error.message.toLowerCase().includes('invalid login credentials')
    ? 'login_error_incorrect_info'
    : error.message.toLowerCase().includes('user already registered')
    ? 'already_registered_error'
    : 'validation_error_other'
}
