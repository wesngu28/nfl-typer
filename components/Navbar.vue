<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
const toast = ref<HTMLDivElement | null>(null)
const form = ref<HTMLFormElement | null>(null)
function showLoginForm() {
  const form = document.querySelector('.form')
  form?.classList.toggle('hidden')
  form?.classList.toggle('flex')
  form?.classList.toggle('flex-col')
}

async function handleLogin() {
  if (user.value) {
    await client.auth.signOut()
  } else if (email.value) {
    form.value!.toggleAttribute("disabled")
    await client.auth.signInWithOtp({
      email: email.value, options: {
        emailRedirectTo: 'http://localhost:3000'
      }
    })
    toast.value!.classList.add('opacity-100')
    setTimeout(() => {
        toast.value!.classList.remove('opacity-100')
	  }, 2500);
    setTimeout(() => form.value!.toggleAttribute("disabled"), 60000)
  }
}
</script>

<template>
  <header class="flex h-16 w-full flex-initial items-center justify-between pt-8">
    <p class="ml-8 flex items-center">
      <img src="NFL.svg" width="50" height="50" /> NFL Typer
    </p>
    <div class="flex gap-4 relative">
      <button class="rounded-md bg-gray-600 bg-opacity-20 px-4 py-2 text-white hover:bg-opacity-30 mr-8"
          v-if="user" @click="showLoginForm">Log Out</button>
      <button class="rounded-md bg-gray-600 bg-opacity-20 px-4 py-2 text-white hover:bg-opacity-30 mr-8"
          v-else @click="showLoginForm">Sign In</button>
      <form class="bg-gray-500 form absolute hidden top-12 right-7 p-2" @submit.prevent="handleLogin">
        <input type="email" class="border border-gray-800 p-2 bg-gray-500 mb-2" placeholder="Email" v-model="email" />
        <input ref="form" type="submit" value="Send magic link"
          class="disabled:opacity-50 hover:bg-opacity-100 active:scale-95 bg-opacity-60 transition-all duration-500 ease-in text-sm m-1 p-2 bg-green-700 text-white font-bold rounded-md" />
      </form>
    </div>
    <div ref="toast" class="bg-gray-600 p-6 rounded-md absolute bottom-28 right-4 opacity-0 transition-opacity duration-1000 ease-in">
      <p>Magic link sent to {{ email }}!</p>
    </div>
  </header>
</template>
