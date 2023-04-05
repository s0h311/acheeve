<template>
  <div class="grid place-items-center gap-5 pt-56">
    <h1 class="text-primary text-5xl font-semibold mb-10">{{ $t('new_password') }}</h1>

    <InputField
    name="password"
    label="New Password"
    placeholder="*******"
    type="password"
    @change-input="onchange"/>

    <InputField
    name="passwordConfirm"
    label="Confirm Password"
    placeholder="*******"
    type="password"
    @change-input="onchange"/>

    <div class="responsive-1 relative -mt-10">
      <p class="absolute right-0 text-red-500" v-if="errorMessage">Please Try Again</p>
    </div>

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

const errorMessage = ref(false)

const handle = async () => {
  if (passwords.value.password === passwords.value.passwordConfirm) {
    const { data, error } = await supabase.auth.updateUser({
      password: passwords.value.password
    })
    navigateTo('/')
  } else {
    errorMessage.value = true
  }
} 

const onchange = (name, input) => {
  passwords.value[name] = input
}
</script>