<template>
  <div class="grid place-items-center gap-5 pt-56">
    <h1 class="text-primary text-5xl font-semibold mb-10">{{ $t('password_reset') }}</h1>

    <InputField
    name="password"
    label="New Password"
    placeholder="*******"
    @change-input="onchange"/>

    <InputField
    name="passwordConfirm"
    label="Confirm Password"
    placeholder="*******"
    @change-input="onchange"/>

    <InputButton :text="$t('set_new_password')" @click="handle" />
  </div>
</template>
  
<script setup>

const passwords = useState('passwords', () => {
  return {
    password: '', 
    passwordConfirm: ''
  }
})
const supabase = useSupabaseClient();

const handle = async () => {
  if (passwords.value.password === passwords.value.passwordConfirm) {
    const { data, error } = await supabase.auth.updateUser({
      password: passwords.value.password
    })
  }
  navigateTo('/')
} 

const onchange = (name, input) => {
  passwords.value[name] = input
}
</script>