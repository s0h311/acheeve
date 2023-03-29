<template>
<Login v-if="!user"/>

<p v-if="user">{{ user }}</p>

<button v-if="user" class="bg-white p-2" @click="handleLogout">logout</button>
</template>

<script setup>

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const handleLogout = async () => {
  await supabase.auth.signOut()
}
</script>