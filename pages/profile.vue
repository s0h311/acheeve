<template>
  <div class="grid place-items-center m-auto">
    <h1 class="text-primary text-5xl font-semibold mb-14">{{ $t('profile') }}</h1>

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

const supabase = useSupabaseClient()
const l = useLocalePath()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo(l('/login'))
}
</script>
