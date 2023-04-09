<template>
  <div class="grid place-items-center gap-6 w-full my-auto">
    <Logo />
    <h1 class="text-primary text-xl font-semibold">{{ $t('welcome_text') }}</h1>
    
    <InputField
    v-for="input in inputs" :key="input.id"
    :id="input.id"
    :name="input.name"  
    :label="input.label"
    :placeholder="input.placeholder"
    :type="input.type"
    :is-error="errorMessage"
    @change-input="onchange"/>
    
    <div class="space-y-4 responsive-1 -mt-6 mb-6">
      <div class="flex relative items-center">
        <NuxtLink to="/resetPassword" class="underline text-primary text-sm">{{$t('button_forgot_password')}}</NuxtLink>
        <p class="absolute right-0 text-red-500" v-if="errorMessage">{{$t('error_message_login')}}</p>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <InputButton :text="$t('button_login')" @click="handle('email')" />
        <InputButton :text="$t('button_sign_up')" @click="navigateTo('/signup')" />
      </div>
    </div>
    
    <div class="flex justify-center space-x-4">
      <button
      v-for="provider in authProviders"
      class="rounded-xl bg-white p-1"
      @click="handle(provider.name)">
      <img class="w-10" :src="provider.image" :alt="`login with ${provider.name}}`" />
      </button>
    </div>
  </div>
</template>

<script setup>

const {t} = useI18n();

const inputs = [
  {
    id: 1,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de'
  },
  {
    id: 2,
    name: 'password',
    label: t('password'),
    placeholder: '*******',
    type: 'password'
  },
]

const authProviders = [
  {
    id: 1,
    name: 'google',
    image: '/auth/google.png'
  },
  {
    id: 2,
    name: 'facebook',
    image: '/auth/facebook.png'
  },
  {
    id: 3,
    name: 'apple',
    image: '/auth/apple-white.png'
  },
]

const credentials = useState('credentials', () => { 
  return {
    email: '',
    password: ''
  }
})

const errorMessage = ref(false)

const supabase = useSupabaseClient()

const handle = async (authProvider) => {
  if (authProvider === 'email') {
    emailLogin()
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: authProvider
    })
    if (error) {
      errorMessage.value = true
      return
    }
    navigateTo('/')
  }
}

const emailLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.value.email,
    password: credentials.value.password
  })

  if (error) {
    errorMessage.value = true
    return
  }
  navigateTo('/')
}

const onchange = (name, input) => {
  errorMessage.value = false
  credentials.value[name] = input
}
</script>