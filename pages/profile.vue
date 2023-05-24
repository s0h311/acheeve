<template>
  <div class="grid place-items-center gap-4 m-auto">
    <h1 class="text-3xl font-semibold">{{ $t('profile') }}</h1>

    <span class="flex">
      <p class="text-xl font-thin">{{ $t('welcome_profile') }}</p>
      <p>&ensp;</p>
      <p class="text-xl italic">{{ userName }}</p>
    </span>

    <InputButton
      :text="$t('logout')"
      @click="handleLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { UserProfile } from '../types'

definePageMeta({
  layout: 'centered',
  middleware: ['auth'],
})
const l = useLocalePath()

const supabase = useSupabaseClient()

const profile: UserProfile = await useUserProfile()

const userName = computed<string>(() => profile.name.toUpperCase())

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo(l('/login'))
}
</script>
