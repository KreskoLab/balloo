<template>
  <div class="page flex flex-col items-center w-full space-y-8">
    <h1 class="font-semibold text-2xl">Налаштування аккаунта</h1>

    <form
      class="flex flex-col space-y-4"
      @submit.prevent="updateUser()"
    >
      <UiInput
        v-model="user.name"
        label="Ім'я"
        :value="user.name"
        :required="true"
      />

      <UiInput
        v-model="user.email"
        label="Email"
        type="email"
        :value="user.email"
        :required="true"
      />

      <UiInput
        v-model="user.phone"
        label="Телефон"
        type="tel"
        :value="user.phone"
        :required="true"
      />

      <UiButton color="bg-blue-100">Оновити</UiButton>
    </form>
  </div>
</template>

<script>
import UiButton from '../components/UiButton.vue'
export default {
  components: { UiButton },
  data() {
    return {
      user: {},
    }
  },

  async fetch() {
    this.user = await this.$axios.$get('api/me')
  },

  methods: {
    async updateUser() {
      await this.$axios.$put(`api/me`, this.user).then(() => this.$router.push('/'))
    },
  },
}
</script>
