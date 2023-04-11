<template>
  <div v-if="user" class="grid place-items-center m-auto">
    <p class="text-primary text-2xl font-semibold text-center">Hey {{ name }}</p>
    <InputButton :text="$t('logout')" @click="handleLogout" />
  </div>
  <Login v-else />
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const name = ref('')

if (user.value) {
  const profile = await useUserProfile(user.value.id)
  name.value = profile[0].name
}

const handleLogout = async () => {
  await supabase.auth.signOut()
}

</script>