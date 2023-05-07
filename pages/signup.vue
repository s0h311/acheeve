<template>
  <div class="grid place-items-center responsive-w m-auto">
    <h1 class="text-5xl font-semibold mb-14">{{ $t('create_new_account') }}</h1>

    <InputField
      class="mb-6"
      v-for="input in inputs"
      :key="input.id"
      :id="input.id"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :type="input.type"
      :errorMessage="input.errorMessage"
      @change-input="onchange"
    />
    <p
      v-if="errorMessage"
      class="place-self-end -mt-6 text-red-500"
    >
      {{ $t(errorMessage) }}
    </p>

    <div class="grid grid-cols-2 gap-6 w-full">
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

<script setup lang="ts">
definePageMeta({
  layout: 'centered',
  middleware: ['not-auth'],
})

const { t } = useI18n()
const l = useLocalePath()
const supabase = useSupabaseClient()

const errorMessage = ref<string | null>(null)

interface SignupInputs {
  id: Number
  name: String
  label: String
  placeholder: String
  type?: String
  errorMessage: String
}

interface Credentials {
  name: string
  email: string
  password: string
}

const inputs = ref<SignupInputs[]>([
  {
    id: 1,
    name: 'name',
    label: t('input_label_name_signup'),
    placeholder: 'John',
    errorMessage: '',
  },
  {
    id: 2,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de',
    errorMessage: '',
  },
  {
    id: 3,
    name: 'password',
    label: t('password'),
    placeholder: '*******',
    type: 'password',
    errorMessage: '',
  },
])

const credentials = useState('credentials', (): Credentials => {
  return {
    name: '',
    email: '',
    password: '',
  }
})

const handle = async () => {
  let nameValidationError: string | null = useValidateName(credentials.value.name)
  let emailValidationError: string | null = useValidateMail(credentials.value.email)
  let passwordValidationError: string | null = useValidatePassword(credentials.value.password)

  if (nameValidationError) inputs.value[0].errorMessage = nameValidationError
  if (emailValidationError) inputs.value[1].errorMessage = emailValidationError
  if (passwordValidationError) inputs.value[2].errorMessage = passwordValidationError
  if (!nameValidationError && !emailValidationError && !passwordValidationError) {
    const { data: user, error } = await supabase.auth.signUp({
      email: credentials.value.email,
      password: credentials.value.password,
    })

    if (error) {
      let message = useGetSupabaseErrorMessage(error)
      errorMessage.value = message
    }

    if (user && !error) {
      const { error } = await supabase.from('profiles').insert({
        name: credentials.value.name,
        id: user.user.id,
      })

      if (error) {
        let message = useGetSupabaseErrorMessage(error)
        errorMessage.value = message
      } else {
        navigateTo(l('/'))
      }
    }
  }
}

const onchange = (name: string, input: string) => {
  inputs.value[0].errorMessage = ''
  inputs.value[1].errorMessage = ''
  inputs.value[2].errorMessage = ''
  errorMessage.value = null
  credentials.value[name] = input
}
</script>
