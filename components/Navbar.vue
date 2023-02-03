<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
function showLoginForm() {
  const form = document.querySelector('.form')
  form?.classList.toggle('hidden')
  form?.classList.toggle('flex')
  form?.classList.toggle('flex-col')
}

async function handleLogin() {
  if (user.value) {
    const { error } = await client.auth.signOut()
  } else {
    const { error } = await client.auth.signInWithOtp({
      email: email.value, options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })
  }
}
</script>

<template>
  <header class="flex h-16 w-full flex-initial items-center justify-between pt-8">
    <p class="ml-4 flex items-center">
      <img src="NFL.svg" width="50" height="50" /> NFL Typer
    </p>
    <div class="flex gap-4 relative">
      <p>Your Scores</p>
      <button v-if="user" @click="showLoginForm" class="mr-4">Log Out</button>
      <button v-else @click="showLoginForm" class="mr-4">Sign In</button>
      <form class="bg-gray-500 form absolute hidden top-10 right-7" @submit.prevent="handleLogin">
        <input class="p-2 bg-gray-500 mb-2" placeholder="Email" v-model="email" />
        <input type="submit" class="text-sm m-1 p-2 bg-green-700 text-white font-bold rounded-md"
          value="Send magic link" />
      </form>
    </div>
  </header>
</template>
