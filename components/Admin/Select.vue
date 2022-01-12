<template>
    <div v-click-outside="close" class="relative">
        
        <button @click.prevent="show()" class="w-full select" :class="select_border">

            <label class="absolute flex justify-start top-1" :class="[label_class, label_focus]">
                {{ label }}
            </label>

            <p class="absolute top-1 text-left pl-3 pr-5 truncate w-full">{{ view }}</p>

            <svg class="absolute right-1 top-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" v-if="active" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" v-else />
            </svg>

        </button>

        <ul class="absolute w-full bg-light-50 shadow-sm z-10 mt-1" v-if="active">
            <li 
                v-for="option in options" 
                :key="option"
                :class="selected.includes(option) ? 'bg-orange-400 bg-opacity-20' : ''"
                @click="selectOption(option)"
            >
                {{ option }} 
            </li>
        </ul>
        
    </div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: [Array, String]
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            active: false,
            selected: []
        }
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        label_class() {
            return this.selected.length > 0 ? 'transform scale-75 -translate-y-6' : 'duration-300'
        },
        label_focus() {
            return this.active ? 'text-orange-400 transform scale-75 -translate-y-6' : ''
        },
        select_border() {
            return this.active ? 'border-orange-400' : 'border-gray-800'
        },
        view() {
            return this.selected.join(", ")
        }
    },
    watch: {
        value(new_value) {
            if (!this.selected.includes(new_value)) {
                this.clear()
                
                if (Array.isArray(new_value)) {
                    new_value.forEach(item => this.selected.push(item))
                } else {
                    this.selected.push(new_value)
                }
            }
        }
    },
    methods: {
        show() {
            this.active = !this.active
        },
        close() {
            this.active = false
        },
        clear() {
            this.selected = []
        },
        isSelected(option) {
            return this.selected.includes(option)
        },
        unSelect(option) {
            let index = this.selected.indexOf(option)
            this.selected.splice(index, 1)
        },
        selectOption(option) {
            console.log(option);
            if (this.multiple) {
                this.isSelected(option) ? this.unSelect(option) : this.selected.push(option)
                this.$emit('selected', this.selected)
            }

            else {
                this.clear()
                this.selected.push(option)
                this.close()
                this.$emit('selected', this.selected[0])
            }
        }
    }
}
</script>

<style scoped>
.select {
  @apply
  border-0 border-b-2
  hover:(cursor-pointer)
  py-4
  min-w-48
} 

li {
    @apply
    px-2 
    cursor-pointer
    select-none
    even:mt-1
    hover:(bg-orange-400 bg-opacity-20 transition duration-300) py-2
}
</style>