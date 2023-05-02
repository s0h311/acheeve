<template>
  <div class="grid place-items-center w-full my-auto md:pt-0">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('password_reset') }}</h1>

    <InputField
      name="email"
      label="E-Mail"
      placeholder="john@wick.de"
      :is-error="errorMessage"
      @change-input="onchange"
    />

    <div class="responsive-1 relative mb-6">
      <p
        class="absolute right-0 text-red-500"
        v-if="errorMessage"
      >
        {{ $t('error_message_resetpassword') }}
      </p>
    </div>

    <InputButton
      :text="$t('button_reset_password')"
      @click="handle"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'centered',
  middleware: ['not-auth'],
})

const l = useLocalePath()
const { t } = useI18n()
const email = ref<string>('')
const supabase = useSupabaseClient()
const errorMessage = ref<string | null>(null)

const handle = async () => {
  let passwordValidationError: string | null = useValidateMail(email.value)
  if (passwordValidationError) errorMessage.value = t(passwordValidationError)
  else {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'https://acheeve.app/setNewPassword',
    })
    if (error) errorMessage.value = t('validation_error_other') // Muss geändert werden!
    else navigateTo(l('/'))
  }
}

const onchange = (_name: string, input: string) => {
  errorMessage.value = null
  email.value = input
}
</script>
