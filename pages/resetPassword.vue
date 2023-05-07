<template>
  <div class="grid place-items-center responsive-w m-auto">
    <h1 class="text-5xl font-semibold mb-14">{{ $t('password_reset') }}</h1>

    <InputField
      name="email"
      label="E-Mail"
      placeholder="john@wick.de"
      :errorMessage="validationErrorMessage"
      @change-input="onchange"
    />

    <p
      v-if="errorMessage"
      class="place-self-end text-red-500"
    >
      {{ $t(errorMessage) }}
    </p>

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
const supabase = useSupabaseClient()

const email = ref<string>('')
const validationErrorMessage = ref<string>('')
const errorMessage = ref<string | null>(null)

const handle = async () => {
  let emailValidationError: string | null = useValidateMail(email.value)
  if (emailValidationError) validationErrorMessage.value = emailValidationError
  else {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: 'https://acheeve.app/setNewPassword',
    })
    if (error) {
      let message = useGetSupabaseErrorMessage(error)
      errorMessage.value = message
    } else {
      navigateTo(l('/'))
    }
  }
}

const onchange = (_name: string, input: string) => {
  validationErrorMessage.value = ''
  errorMessage.value = null
  email.value = input
}
</script>
