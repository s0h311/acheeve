<template>
  <div class="grid place-items-center w-full my-auto md:pt-0">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('password_reset') }}</h1>

    <InputField
    name="email"
    label="E-Mail"
    placeholder="john@wick.de"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <div class="responsive-1 relative mb-6">
      <p class="absolute right-0 text-red-500" v-if="errorMessage">{{ $t('button_error_message') }}</p>
    </div>

    <InputButton :text="$t('button_reset_password')" @click="handle" />
  </div>
</template>
  
<script setup>

const email = ref('')
const supabase = useSupabaseClient();
const errorMessage = ref(false)

const handle = async () => {
  const { value, error: validationError } = useValidateMail(email.value)
  if (validationError) errorMessage.value = true
  else {
  const { data, error } = supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'https://acheeve.app/setNewPassword'
  })
  if (error) errorMessage.value = true
  else navigateTo('/')
  }
}

const onchange = (_name, input) => {
  errorMessage.value = false
  email.value = input
}
</script>