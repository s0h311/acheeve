<template>
  <div class="grid place-items-center w-full my-auto">
    <!---pt-32-->
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('create_new_account') }}</h1>

    <InputField
      class="mb-6"
      v-for="input in inputs"
      :key="input.id"
      :id="input.id"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :type="input.type"
      :is-error="errorMessage"
      @change-input="onchange"
    />

    <div
      class="responsive-1 relative -mt-6 mb-6"
      v-if="errorMessage"
    >
      <p class="absolute right-0 text-red-500">{{ $t('error_message_signup') }}</p>
    </div>

    <div class="grid grid-cols-2 gap-6 responsive-1">
      <InputButton
        :text="$t('button_login')"
        @click="navigateTo(l('/login'))"
      />
      <InputButton
        :text="$t('button_sign_up')"
        @click="handle"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'centered',
  middleware: ['not-auth'],
})

const { t } = useI18n()
const l = useLocalePath()
const supabase = useSupabaseClient()
const errorMessage = ref(false)

const inputs = [
  {
    id: 1,
    name: 'name',
    label: t('input_label_name_signup'),
    placeholder: 'John',
  },
  {
    id: 2,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de',
  },
  {
    id: 3,
    name: 'password',
    label: t('password'),
    placeholder: '*******',
    type: 'password',
  },
]

const credentials = useState('credentials', () => {
  return {
    name: '',
    email: '',
    password: '',
  }
})

const handle = async () => {
  const { error: emailValidationError } = useValidateMail(credentials.value.email)
  const { error: passwordValidationError } = useValidatePassword(credentials.value.password)

  if (emailValidationError || passwordValidationError || !credentials.value.name) errorMessage.value = true
  else {
    const { data: user, error } = await supabase.auth.signUp({
      email: credentials.value.email,
      password: credentials.value.password,
    })
    if (user) {
      const { error } = await supabase.from('profiles').insert({
        name: credentials.value.name,
        id: user.user.id,
      })

      if (error) {
        errorMessage.value = true
      } else {
        navigateTo(l('/'))
      }
    }
    if (error) {
      errorMessage.value = true
    }
  }
}

const onchange = (name, input) => {
  errorMessage.value = false
  credentials.value[name] = input
}
</script>
