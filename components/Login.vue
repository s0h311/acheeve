<template>
  <div class="grid place-items-center gap-8 md:mt-10">
    <button class="bg-slate-200 w-52 h-52 rounded-full">
      <img src="/logo.png" alt="acheeve logo" />
    </button>
    <p class="text-primary text-xl font-semibold">{{ $t('welcome_text') }}</p>
    <div class="w-full md:w-fit">
      <InputField
      class="mb-2"
      v-for="input in inputs" :key="input.id"
      :id="input.id"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :type="input.type"
      @change-input="onchange"/>
    </div>
    <div class="space-y-8 w-full md:w-1/6 -mt-8 mb-8">
      <div class="flex relative items-center">
        <NuxtLink to="/resetPassword" class="underline text-primary text-sm">Reset Password</NuxtLink>
        <p class="absolute right-0 text-red-500" v-if="errorMessage">Please Try Again</p>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <InputButton text="Login" @click="handle('email')" />
        <InputButton text="Sign Up" @click="navigateTo('/signup')" />
      </div>
    </div>
    <div class="flex justify-center space-x-4">
      <button class="rounded-xl bg-white p-1" @click="handle('google')">
      <img class="w-10" src="@/assets/static/auth/google.png" alt="" />
      </button>
      <button class="rounded-xl bg-white p-1" @click="handle('facebook')">
      <img class="w-10" src="@/assets/static/auth/facebook.png" alt="" />
      </button>
      <button class="rounded-xl bg-white p-1" @click="handle('apple')">
      <img class="w-10" src="@/assets/static/auth/apple-white.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup>

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
    label: 'Password',
    placeholder: '*******',
    type: 'password'
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.value.email,
      password: credentials.value.password
    })

    if (error) {
    errorMessage.value = true
    console.log(error)
    }
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: authProvider
  })
  if (error) {
    errorMessage.value = true
    console.log(error)
  }
  }
  navigateTo('/')
}

const onchange = (name, input) => {
  credentials.value[name] = input
}
</script>