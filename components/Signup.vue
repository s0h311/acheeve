<template>
  <div class="grid place-items-center gap-3 pt-32">
    <h1 class="text-primary text-5xl font-semibold mb-10">Create a new Account</h1>
    
    <div class="w-full md:w-fit">
      <InputField
      v-for="input in inputs" :key="input.id"
      :id="input.id"
      :name="input.name"
      :label="input.label"
      :placeholder="input.placeholder"
      :type="input.type"
      @change-input="onchange"/>

      <div class="grid grid-cols-2 gap-6 w-full">
        <InputButton text="Login" @click="navigateTo('/login')" />
        <InputButton text="Sign Up" @click="handle" />
      </div>
    </div>

    
  </div>
</template>

<script setup>

const supabase = useSupabaseClient()

const inputs = [
  {
    id: 1,
    name: 'name',
    label: 'What should we call you?',
    placeholder: 'John',
  },
  {
    id: 2,
    name: 'email',
    label: 'E-Mail',
    placeholder: 'john@wick.de'
  },
  {
    id: 3,
    name: 'password',
    label: 'Password',
    placeholder: '*******',
    type: 'password'
  },
]

const credentials = useState('credentials', () => {
  return {
    email: '',
    password: '',
    name:'',
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