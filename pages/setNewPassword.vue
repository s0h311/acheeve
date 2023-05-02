<template>
  <div class="grid place-items-center w-full my-auto">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('new_password') }}</h1>

    <InputField
      class="mb-6"
      name="password"
      :label="$t('input_new_password')"
      placeholder="*******"
      type="password"
      :is-error="errorMessage"
      @change-input="onchange"
    />

    <InputField
      name="passwordConfirm"
      :label="$t('input_confirm_new_password')"
      placeholder="*******"
      type="password"
      :is-error="errorMessage"
      @change-input="onchange"
    />

    <div class="responsive-w relative mb-6">
      <p
        class="absolute right-0 text-red-500"
        v-if="errorMessage"
      >
        {{ $t('error_message_setnewpassword') }}
      </p>
    </div>

    <InputButton
      :text="$t('set_new_password')"
      @click="handle"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'centered',
  middleware: ['password-recovery'],
})

const { t } = useI18n()
const l = useLocalePath()

const passwords = useState('passwords', () => {
  return {
    password: '',
    passwordConfirm: '',
  }
})
const supabase = useSupabaseClient()
const errorMessage = ref<string | null>(null)

const handle = async () => {
  let passwordValidationError: string | null = useValidateMail(passwords.value.password)
  if (passwordValidationError) errorMessage.value = t(passwordValidationError)
  if (passwords.value.password !== passwords.value.passwordConfirm) errorMessage.value = t('validation_error_other') // ÄNDERN
  else {
    const { error } = await supabase.auth.updateUser({
      password: passwords.value.password,
    })
    if (error) errorMessage.value = t('validation_error_other') // ÄNDERN
    else navigateTo(l('/'))
  }
}

const onchange = (name: string, input: string) => {
  errorMessage.value = null
  passwords.value[name] = input
}
</script>
