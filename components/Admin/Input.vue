<template>
  <div class="relative flex">

    <input 
      @input="$emit('text', $event.target.value)" 
      :value="value"
      :id="name" 
      class="input" 
      type="text" 
      placeholder=" "
    >

    <label 
      class="absolute top-1 cursor-text select-none duration-300 w-max" 
      :for="name"
    >
      {{ label }}
    </label>

    <svg 
      :class="classes" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      @mouseenter="classes = show"
      @mouseleave="classes = hide"
      @click="remove()"
      v-if="isRemovable && name !== 'input_1'"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    isRemovable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      classes: 'hidden absolute right-0 top-1 h-6 w-6 cursor-pointer',
      hide: 'hidden absolute right-0 top-1 h-6 w-6 cursor-pointer',
      show: 'block absolute right-0 top-1 h-6 w-6 cursor-pointer'
    }
  },
  methods: {
    remove() {
      this.$emit('remove', this.name)
    }
  }
}
</script>

<style scoped>
.input {
  @apply
  block
  w-max
  pb-0 px-4
  border-0 border-b-2 border-gray-800
  bg-transparent
  appearance-none
  focus:(outline-none border-orange-400 ring-0)
  active:(outline-none border-orange-400)
}

input:focus-within ~ label,
input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-6 ml-2;
}

input:focus-within ~ label {
  @apply text-orange-400;
}

input:focus-within ~ svg {
  @apply block;
}
</style>