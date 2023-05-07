<template>
  <div class="grid place-items-center responsive-w m-auto">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('new_password') }}</h1>

    <InputField
      class="mb-6"
      name="password"
      :label="$t('input_new_password')"
      placeholder="*******"
      type="password"
      :errorMessage="validationErrorMessage"
      @change-input="onchange"
    />

    <InputField
      name="passwordConfirm"
      :label="$t('input_confirm_new_password')"
      placeholder="*******"
      type="password"
      :errorMessage="mismatchErrorMessage"
      @change-input="onchange"
    />

    <p
      v-if="errorMessage"
      class="place-self-end text-red-500"
    >
      {{ $t(errorMessage) }}
    </p>

    <InputButton
      :text="$t('set_new_password')"
      @click="handle"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'centered',
  //middleware: ['password-recovery'],
})

const l = useLocalePath()
const { t } = useI18n()
const supabase = useSupabaseClient()

const validationErrorMessage = ref<string>('')
const mismatchErrorMessage = ref<string>('')
const errorMessage = ref<string | null>(null)
const passwords = useState('passwords', () => {
  return {
    password: '',
    passwordConfirm: '',
  }
})

const handle = async () => {
  let passwordValidationError: string | null = useValidatePassword(passwords.value.password)
  let passwordMismatchError: boolean = passwords.value.password !== passwords.value.passwordConfirm ? true : false
  if (passwordValidationError) validationErrorMessage.value = passwordValidationError
  if (passwordMismatchError) mismatchErrorMessage.value = 'error_message_password_confirm'
  if (!passwordValidationError && !passwordMismatchError) {
    const { error } = await supabase.auth.updateUser({
      password: passwords.value.password,
    })
    if (error) {
      let message = useGetSupabaseErrorMessage(error)
      errorMessage.value = message
    } else {
      navigateTo(l('/'))
    }
  }
}

const onchange = (name: string, input: string) => {
  validationErrorMessage.value = ''
  mismatchErrorMessage.value = ''
  errorMessage.value = null
  passwords.value[name] = input
}
</script>
