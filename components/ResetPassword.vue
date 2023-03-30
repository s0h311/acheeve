<template>
  <div class="grid place-items-center gap-5 pt-56">
    <h1 class="text-primary text-5xl font-semibold mb-10">Password reset
    </h1>
    <input class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield" type="text" placeholder="E-Mail"
    v-model="email">
    <button class="rounded-3xl bg-blue-400 px-2 py-2.5 w-full text-sm text-primary font-bold" @click="handle">Reset password</button>
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