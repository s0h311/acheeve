<template>
  <div class="grid place-items-center w-full my-auto">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('new_password') }}</h1>

    <InputField
    class="mb-6"
    name="password"
    label="New Password"
    placeholder="*******"
    type="password"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <InputField
    name="passwordConfirm"
    label="Confirm Password"
    placeholder="*******"
    type="password"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <div class="responsive-1 relative mb-6">
      <p class="absolute right-0 text-red-500" v-if="errorMessage">Please Try Again</p>
    </div>

    <InputButton :text="$t('set_new_password')" @click="handle" />
  </div>
</template>
  
<script setup>

definePageMeta({
  middleware: [
    (to, from) => {
      const supabase = useSupabaseClient()
      const isRecovery = ref(false)
      supabase.auth.onAuthStateChange((event, _session) => {
        if (event == 'PASSWORD_RECOVERY') isRecovery.value = true
      })

      if (isRecovery) return
      else return navigateTo('/')
    }
  ]
})

const passwords = useState('passwords', () => {
  return {
    password: '', 
    passwordConfirm: ''
  }
})
const supabase = useSupabaseClient();
const errorMessage = ref(false)

const handle = async () => {
  if (passwords.value.password === passwords.value.passwordConfirm) {
    const { data, error } = await supabase.auth.updateUser({
      password: passwords.value.password
    })
    if (error) errorMessage.value = true
    else navigateTo('/')
  } else errorMessage.value = true
} 

const onchange = (name, input) => {
  errorMessage.value = false
  passwords.value[name] = input
}
</script>