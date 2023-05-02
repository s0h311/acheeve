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
      class="responsive-w relative -mt-6 mb-6"
      v-if="errorMessage"
    >
      <p class="absolute right-0 text-red-500">{{ errorMessage }}</p>
    </div>

    <div class="grid grid-cols-2 gap-6 responsive-w">
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

interface Credential {
  id: Number
  name: String
  label: String
  placeholder: String
  type?: String
}

const inputs: Credential[] = [
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
  let emailValidationError: string | null = useValidateMail(credentials.value.email)
  let passwordValidationError: string | null = useValidatePassword(credentials.value.password)
  let nameValidationError: string | null = useValidateName(credentials.value.name)

  if (emailValidationError) errorMessage.value = t(emailValidationError)
  else if (passwordValidationError) errorMessage.value = t(passwordValidationError)
  else if (nameValidationError) errorMessage.value = t(nameValidationError)
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
        errorMessage.value = 'error'
      } else {
        navigateTo(l('/'))
      }
    }
    if (error) {
      errorMessage.value = 'error'
    }
  }
}

const onchange = (name: string, input: string) => {
  errorMessage.value = null
  credentials.value[name] = input
}
</script>
