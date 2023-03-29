<template>
  <div class="grid place-items-center gap-8 mt-10">
    <button class="bg-slate-200 w-52 h-52 rounded-full">LOGO</button>
    <p class="text-primary text-xl font-semibold">Welcome to Acheeve, a Web-App helping to manage your habits and thoughts
    </p>
    <input class="rounded-3xl w-full h-9 px-4 outline-none bg-textfield" type="text" placeholder="E-Mail"
      v-model="credentials.email">
    <input class="rounded-3xl w-full h-9 px-4 outline-none -mt-4 bg-textfield" type="password" placeholder="*******"
      v-model="credentials.password">
    <div class="space-y-8 w-full -mt-8 mb-8">
      <NuxtLink to="/signup" class="underline text-primary text-sm">Reset Password</NuxtLink>
      <div class="grid grid-cols-2 gap-6">
        <button class="rounded-3xl bg-blue-400 px-2 py-2.5 w-full text-sm text-primary font-bold" @click="handle('email')">Login</button>
        <button class="rounded-3xl bg-blue-400 px-2 py-2.5 w-full text-sm text-primary font-bold" @click="navigateTo('/signup')">Sign Up</button>
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
const credentials = useState('credentials', () => {
  return {
    email: '',
    password: ''
  }
})

const supabase = useSupabaseClient()

const handle = async (authProvider) => {

  if (authProvider === 'email') {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.value.email,
      password: credentials.value.password
    })

    if (error) {
    console.log(error)
  }
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: authProvider
  })

  if (error) {
    console.log(error)
  }
  }
  
  navigateTo('/')

  
}
</script>