<template>
  <div class="grid place-items-center m-auto">
    <Login v-if="!user"/>

    <div v-else>
      <p class="text-primary text-2xl font-semibold text-center">Hey {{ name }}</p>
      <InputButton :text="$t('logout')" @click="handleLogout"/>
    </div>
  </div>

</template>

<script setup>

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const profile = await useUserProfile(user.value.id)
const name = profile[0].name

const handleLogout = async () => {
  await supabase.auth.signOut()
}

</script>

