<template>
  <div class="grid place-items-center gap-3 pt-32">
    <h1 class="text-primary text-5xl font-semibold mb-10">Create a new Account</h1>
    <div class="flex space-x-4">
      <InputField label="Firstname" name="firstname" placeholder="John" @change-input="onchange"/>
      <InputField label="Lastname" name="lastname" placeholder="Wick" @change-input="onchange"/>
    </div>
    <InputField label="E-Mail" name="email" placeholder="john@wick.de" @change-input="onchange"/>
    <InputField label="Password" name="password" placeholder="*******" type="password" @change-input="onchange"/>
    <InputButton text="Sign Up" @click="handle" />
  </div>
</template>

<script setup>

const supabase = useSupabaseClient()

const inputs = [
  {
    id: 1,
    name: 'firstname',
    label: 'Firstname',
    placeholder: 'John',
  },
  {
    id: 2,
    name: 'lastname',
    label: 'Lastname',
    placeholder: 'Wick'
  },
  {
    id: 3,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de'
  },
  {
    id: 4,
    name: 'password',
    label: 'Password',
    placeholder: '*******'
  },
]

const credentials = useState('credentials', () => {
  return {
    email: '',
    password: '',
    passwordCorfirm: '',
    firstname:'',
    username: '',
    lastname: ''
  }
})

const handle = async () => {
  //if (credentials.value.password !== credentials.value.password) return 
  const { data, error } = await supabase.auth.signUp({
    email: credentials.value.email,
    password: credentials.value.password
  })

  navigateTo('/')
  if (error) {
    console.log(error)
  }
}

const onchange = (name, input) => {
  credentials.value[name] = input
}
</script>