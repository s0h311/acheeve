<template>
  <div class="grid place-items-center mt-20 gap-6">
    <div class="bg-slate-200 w-60 h-60 rounded-full"></div>
    <p class="mx-12 text-center text-xl font-semibold text-white mb-4">Welcome to Acheeve, a Web-App helping to manage your habits and thoughts</p>
    <input
    class="rounded-2xl outline-none bg-slate-300 w-3/5 h-9 px-4"
    type="text"
    placeholder="E-Mail"
    @v-model="inputs.email">
    <input
    class="rounded-2xl outline-none bg-slate-300 w-3/5 h-9 px-4"
    type="password"
    placeholder="***********"
    @v-model="inputs.password">
    <button
    class="text-white"
    @click="handleSignUp">Sign Up</button>

  </div>
</template>

<script setup lang="ts">

const supabase = useSupabaseClient()

const inputs = useState('credentials', () => {
  return {
    email: '',
    password: ''
  }
})

const handleSignUp = () => {
  alert(inputs.value['email'])
}

</script>
