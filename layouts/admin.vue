<template>
  <div class="w-full h-screen">
    <div class="flex flex-row h-full">

      <div class="w-82 h-full py-6 px-4 bg-light-blue-100">
        <AdminNavbar />
      </div>

      <div class="w-full h-full py-6 px-4 bg-light-blue-50">
        <Nuxt />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "admin"
}
</script>

<style scoped>

</style>
