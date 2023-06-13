<template>
  <div class="grid place-items-center gap-6 responsive-w m-auto">
    <Logo />
    <h1 class="text-xl font-semibold">{{ $t('welcome_text') }}</h1>

    <InputField
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
      class="place-self-start -mt-6 text-red-500"
      v-if="errorMessage"
    >
      {{ $t(errorMessage) }}
    </p>
    <NuxtLink
      :to="l('/resetPassword')"
      class="place-self-start -mt-6 underline text-sm"
      >{{ $t('button_forgot_password') }}</NuxtLink
    >
    <div class="space-y-4 w-full -mt-6 mb-6">
      <div class="grid grid-cols-2 gap-6">
        <InputButton
          :text="$t('button_login')"
          @click="handle('email')"
        />
        <InputButton
          :text="$t('button_sign_up')"
          @click="navigateTo(l('/signup'))"
        />
      </div>
    </div>

    <div class="flex justify-center space-x-4">
      <button
        v-for="provider in authProviders"
        :key="provider.id"
        class="rounded-xl bg-primary p-1"
        @click="handle(provider.name)"
      >
        <img
          class="w-10"
          :src="provider.image"
          :alt="`login with ${provider.name}`"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['not-auth'],
})

const l = useLocalePath()
const { t } = useI18n()
const supabase = useSupabaseClient()
const habitService = useHabitService()

const errorMessage = ref<string | null>(null)

const inputs = ref([
  {
    id: 1,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de',
    errorMessage: '',
  },
  {
    id: 2,
    name: 'password',
    label: t('password'),
    placeholder: '*******',
    type: 'password',
    errorMessage: '',
  },
])

const authProviders = [
  {
    id: 1,
    name: 'google',
    image: '/auth/google.png',
  },
  {
    id: 2,
    name: 'facebook',
    image: '/auth/facebook.png',
  },
]

const credentials = useState('credentials', () => {
  return {
    email: '',
    password: '',
  }
})

const handle = async (authProvider: any) => {
  if (authProvider === 'email') {
    emailLogin()
  } else {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: authProvider,
    })
    if (error) {
      let message = useGetSupabaseErrorMessage(error)
      errorMessage.value = message
    } else {
      await habitService?.load()
      navigateTo(l('/'))
    }
  }
}

const emailLogin = async () => {
  let emailValidationError = useValidateMail(credentials.value.email)
  let passwordValidationError = useValidatePassword(credentials.value.password)

  if (emailValidationError) inputs.value[0].errorMessage = emailValidationError
  if (passwordValidationError) inputs.value[1].errorMessage = passwordValidationError
  if (!emailValidationError && !passwordValidationError) {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.value.email,
      password: credentials.value.password,
    })

    if (error) {
      let message = useGetSupabaseErrorMessage(error)
      errorMessage.value = message
    } else {
      await habitService?.load()
      navigateTo(l('/'))
    }
  }
}

const onchange = (name: string, input: string) => {
  inputs.value[0].errorMessage = ''
  inputs.value[1].errorMessage = ''
  errorMessage.value = null
  credentials.value[name] = input
}
</script>
