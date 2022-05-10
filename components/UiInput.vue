<template>
  <div>
    <label class="block mb-2">{{ label }}</label>
    <input
      class="bg-light-100 border border-dark-600 rounded focus:ring-dark-600 focus:border-dark-600 outline-none p-2.5"
      :type="type"
      :value="value"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    label: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'text',
    },

    required: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
