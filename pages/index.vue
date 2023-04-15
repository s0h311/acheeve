<template>
  <div class="grid place-items-center m-auto">
    <p class="text-primary text-2xl font-semibold text-center">Hey {{ name }}</p>
    <InputButton
      :text="$t('logout')"
      @click="handleLogout"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'centered',
  middleware: ['auth'],
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const name = ref('')
const l = useLocalePath()

if (user.value) {
  console.log(user.value.id)
  const { profile, error } = await useUserProfile(user.value.id)

  //if (profile) console.log(profile)
  //if (error) console.log(error)
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo(l('/login'))
}
</script>
