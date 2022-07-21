<template>
  <div class="page flex flex-col items-center w-full space-y-8">
    <h1 class="font-semibold text-2xl">{{ $t('settings.title') }}</h1>

    <form
      class="flex flex-col space-y-4"
      @submit.prevent="updateUser()"
    >
      <AppInput
        v-model="user.name"
        :label="$t('settings.nameInput')"
        :value="user.name"
        :required="true"
      />

      <AppInput
        v-model="user.email"
        label="Email"
        type="email"
        :value="user.email"
        :required="true"
      />

      <AppInput
        v-model="user.phone"
        label="Телефон"
        type="tel"
        :value="user.phone"
        :required="true"
      />

      <AppButton color="bg-blue-100">{{ $t('settings.button') }}</AppButton>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },

  async fetch() {
    this.user = await this.$axios.$get('api/me')
  },

  computed: {
    loggedIn() {
      return this.$store.state.user.loggedIn
    },
  },

  watch: {
    loggedIn(val) {
      if (!val) this.$router.push('/')
    },
  },

  methods: {
    async updateUser() {
      await this.$axios.$put(`api/me`, this.user).then(async () => {
        await this.$store.dispatch('user/getUser')
        this.$router.push('/')
      })
    },
  },
}
</script>
