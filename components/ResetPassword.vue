<template>
  <div class="grid place-items-center gap-5 pt-56">
    <h1 class="text-primary text-5xl font-semibold mb-10">{{ $t('password_reset') }}</h1>

    <InputField
    name="email"
    label="E-Mail"
    placeholder="john@wick.de"
    @change-input="onchange"/>

    <InputButton text="Send Reset E-Mail" @click="handle" />
  </div>
</template>
  
<script setup>

const email = ref('')
const supabase = useSupabaseClient();

const handle = async () => {
  const {data, error} = supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'https://localhost:3000/setNewPassword'
  })
  //todo: Checken ob Account mit angegebener Email existiert
  //      und Mail an die angegebene Mail verschicken (?)

  navigateTo('/')
} 

const onchange = (_name, input) => {
  email.value = input
}
</script>