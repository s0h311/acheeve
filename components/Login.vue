<template>
  <div class="grid place-items-center gap-8">
    <button class="bg-slate-200 w-52 h-52 rounded-full">LOGO</button>
    <p class="text-white text-xl font-semibold">Welcome to Acheeve, a Web-App helping to manage your habits and thoughts
    </p>
    <input class="rounded-3xl w-full h-9 px-4 outline-none" type="text" id="email-input" placeholder="E-Mail"
      v-model="credentials.email">
    <input class="rounded-3xl w-full h-9 px-4 outline-none -mt-4" type="password" id="password-input" placeholder="*******"
      v-model="credentials.password">
    <div class="space-y-4 w-full -mt-8">
      <NuxtLink to="/signup" class="underline text-white text-sm">Reset Password</NuxtLink>
      <div class="grid grid-cols-2 gap-6">
        <button class="rounded-3xl bg-blue-400 p-2 w-full" @click="handle">Login</button>
        <button class="rounded-3xl bg-blue-400 p-2 w-full" @click="navigateTo('/signup')">Sign Up</button>
      </div>
    </div>
    <div>
      <button class="rounded-full p-5 border">G</button>
      <button class="rounded-full p-5 border">F</button>
      <button class="rounded-full p-5 border">A</button>
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

const handle = () => {
  alert(credentials.value.email + credentials.value.password)
}
</script>