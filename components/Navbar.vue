<template>
  <div class="flex items-center w-full px-6 h-14 border-b-1 border-gray-500 animate-slow animate-fadeInLeft">

    <NuxtLink to="/">
      <h1 class="text-2xl font-semibold text-dark-500">Balloo</h1>
    </NuxtLink>

    <div class="mx-12 h-full">
      <Categories />
    </div>

    <div class="flex items-center ml-auto space-x-6 text-dark-500 font-medium">

      <NuxtLink to="/admin" v-if="loggedIn && user.admin">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </NuxtLink>

      <svg class="hidden sm:block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>

      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>

      <a class="flex items-center space-x-2" href="http://localhost:8000/login" v-if="!loggedIn">
        <svg class="hidden sm:block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Увійти</span>
      </a>

      <div class="cursor-pointer" @click="$store.dispatch('user/logout')" v-else>
        <span>{{user.name}}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      show: false
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    loggedIn() {
      return this.$store.state.user.loggedIn
    }
  }
}
</script>
