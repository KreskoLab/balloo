<template>
  <div class="w-full">

    <div class="grid grid-cols-2 gap-x-6 gap-y-3 sm:(grid-cols-3 gap-x-6 gap-y-3)">

      <Card :image="'test'" />

      <Card :image="'3'" />

      <Card :image="'3'" />

      <Card :image="'test2'" />

      <Card :image="'3'" />

      <Card :image="'test'" />


    </div>

  </div>
</template>

<script>
export default {
  created() {
    //this.$store.dispatch('user/getUser')
  }
}
</script>
