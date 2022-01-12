<template>
    <div>

        <div class="flex flex-row justify-between items-center">
            <div>
                <h1 class="text-lg font-medium">Товары</h1>
            </div>

            <div>
                <button @click="create = !create" class="btn font-medium">
                    {{ create ? 'Отменить' : 'Создать' }}
                </button>
            </div>
        </div>

        <div class="my-12">

            <div v-if="create">
                <AdminProductForm
                    :inputs="inputs"
                    :selects="selects"
                />
            </div>
        
        </div>

    </div>
</template>

<script>
export default {
    layout: 'admin',
    async fetch() {
        await this.$axios.$get(`api/subcategories`)
        .then((res) => {
            this.selects[0].langs.forEach(lang => {
                lang.options = res.map(subcategory => ({ 
                    filter: subcategory.filter, 
                    option: subcategory.name.langs.find(item => item.lang == lang.lang).value 
                })) 
            })
        })
    },
    data() {
        return {
            create: false,
            inputs: [
                { 
                    name: 'title', 
                    langs: [ { lang: 'ua', label: 'Назва', value: '' }, { lang: 'ru', label: 'Название', value: '' }]
                },
                { 
                    name: 'quantity', 
                    langs: [ { lang: 'ua', label: 'Кількість', value: '' }, { lang: 'ru', label: 'Количество', value: '' }]
                },
                { 
                    name: 'code', 
                    langs: [ { lang: 'ua', label: 'Код товара', value: '' }, { lang: 'ru', label: 'Код товара', value: '' }]
                }
            ],
            selects: [
                { 
                    name: 'subcategory',  
                    langs: [ { lang: 'ua', label: 'Підкатегорія', value: '' }, { lang: 'ru', label: 'Подкатегория', value: '' }]
                }
            ]
        }
    }
}
</script>