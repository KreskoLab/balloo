<template>
    <div class="table w-full">

        <div class="table-header-group">
            <div class="table-row text-xl text-gray-600">
                <div 
                    v-for="(header, i) in headers" 
                    :key="i" 
                    class="table-cell"
                >
                    {{header}}
                </div>
            </div>
        </div>

        <div class="table-row-group">
            <div 
              v-for="item in filtered_data"
              :key="item.name"
              class="table-row"
            >
                <div 
                  v-for="(value, key) in item"
                  :key="value"
                  class="table-cell align-middle font-medium py-4"
                >
                  <img
                    class="w-16 h-16"
                    :src="$config.imagesURL + value"
                    :alt="item.name"
                    v-if="key === 'image'"
                  >

                  <span v-else>
                    {{ value }}
                  </span>
                </div>

                <div class="table-cell align-middle py-2">
                  <div class="flex space-x-4">
                    <svg
                      class="h-6 w-6 hover:(stroke-amber-500 cursor-pointer)"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      @click="edit(item)"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>

                    <svg
                      class="h-6 w-6 hover:(stroke-red-500 cursor-pointer)"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      @click="showModal(); target = item"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </div>
            </div>
        </div>

        <div v-if="modal">
            <AdminModal  
              :header="`${type} ${target.name}`"
              @close="closeModal(); target = {}"
              @remove="closeModal(); removeTarget()"
            />
        </div>

    </div>
</template>

<script>
export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      headers: {
        type: Array,
        default: () =>[]
      },
      images: {
        type: Boolean,
        default: true
      },
      type: String
    },
    data() {
      return {
          modal: false,
          target: {}
      }
    },
    computed: {
      filtered_data() {
          return this.data.map(({ _id, ...rest }) => rest)
      }
    },
    methods: {
      showModal() {
        this.modal = true
      },
      closeModal() {
        this.modal = false
      },
      findID(target) {
        return this.data.find(item => item.name === target.name)._id
      },
      removeTarget() {
        let id = this.findID(this.target)
        this.$emit('remove', id)
      },
      edit(item) {
        let id = this.findID(item)
        this.$emit('edit', id)
      }
    }
}
</script>