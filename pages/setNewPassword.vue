<template>
  <div class="grid place-items-center w-full my-auto">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('new_password') }}</h1>

    <InputField
    class="mb-6"
    name="password"
    :label="$t('input_new_password')"
    placeholder="*******"
    type="password"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <InputField
    name="passwordConfirm"
    :label="$t('input_confirm_new_password')"
    placeholder="*******"
    type="password"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <div class="responsive-1 relative mb-6">
      <p class="absolute right-0 text-red-500" v-if="errorMessage">{{ $t('error_message_setnewpassword') }}</p>
    </div>

    <InputButton :text="$t('set_new_password')" @click="handle" />
  </div>
</template>
  
<script setup>
const l = useLocalePath();

definePageMeta({
  middleware: ['password-recovery']
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
    else navigateTo(l('/'))
  } else errorMessage.value = true
} 

const onchange = (name, input) => {
  errorMessage.value = false
  passwords.value[name] = input
}
</script>