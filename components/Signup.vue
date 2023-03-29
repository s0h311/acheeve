<template>
  <div class="grid place-items-center gap-5 pt-32">
    <h1 class="text-primary text-5xl font-semibold mb-10">Create a new Account</h1>
    <div class="flex space-x-4">
      <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="text" placeholder="Firstname"
      v-model="credentials.firstname">
      <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="text" placeholder="Lastname"
      v-model="credentials.lastname">
    </div>
    <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="text" placeholder="Username"
    v-model="credentials.username">
    <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="text" placeholder="E-Mail"
    v-model="credentials.email">
    <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="password" placeholder="Password"
    v-model="credentials.password">
    <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="password" placeholder="Repeat your password"
    v-model="credentials.passwordRepeated">
    <button class="rounded-3xl bg-blue-400 px-2 py-2.5 w-full text-sm text-primary font-bold" @click="handle">Sign Up</button>
  </div>
</template>

<script setup>
const credentials = useState('credentials', () => {
  return {
    email: '',
    password: '',
    passwordRepeated: '',
    firstname:'',
    username: '',
    lastname: ''
  }
})

const supabase = useSupabaseClient()

const handle = async () => {

  //if (credentials.value.password != credentials.value.password) return
  
  const { data, error } = await supabase.auth.signUp({
    email: credentials.value.email,
    password: credentials.value.password
  })

  navigateTo('/')
  if (error) {
    console.log(error)
  }
}
</script>