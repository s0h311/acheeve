<template>
  <div class="grid place-items-center gap-5 pt-56">
    <h1 class="text-primary text-5xl font-semibold mb-10">Password Reset</h1>
    <input class="rounded-3xl w-full md:w-1/6 h-10 px-4 outline-none bg-textfield" type="text" placeholder="E-Mail"
    v-model="email">
    <InputButton text="Send Reset E-Mail" @click="handle" />
  </div>
</template>
  
<script setup>

const email = ref('')

const handle = async () => {

  //todo: Checken ob Account mit angegebener Email existiert
  //      und Mail an die angegebene Mail verschicken (?)

  navigateTo('/')
} 
</script>