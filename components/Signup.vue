<template>
  <div class="grid place-items-center w-full my-auto"> <!---pt-32-->
    <h1 class="text-primary text-5xl font-semibold mb-14">Create a new Account</h1>

    <InputField
    class="mb-6"
    v-for="input in inputs" :key="input.id"
    :id="input.id"
    :name="input.name"
    :label="input.label"
    :placeholder="input.placeholder"
    :type="input.type"
    :is-error="errorMessage"
    @change-input="onchange"/>

    <div class="responsive-1 relative -mt-6 mb-6" v-if="errorMessage">
      <p class="absolute right-0 text-red-500">Please Try Again</p>
    </div>
    
    <div class="grid grid-cols-2 gap-6 responsive-1">
      <InputButton text="Login" @click="navigateTo('/login')" />
      <InputButton text="Sign Up" @click="handle" />
    </div>
  </div>
</template>

<script setup>

const supabase = useSupabaseClient()
const errorMessage = ref(false)

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

  if (!error) {
    navigateTo('/')
  } else {
    errorMessage.value = true
    console.log(error)
  }
}

const onchange = (name, input) => {
  errorMessage.value = false
  credentials.value[name] = input
}
</script>