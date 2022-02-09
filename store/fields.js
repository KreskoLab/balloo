export const state = () => ({
    schema: [],
    fields: [
        {
            name: 'input_1',
            type: 'input',
            langs: [
                { lang: 'uk', label: '', value: '' },
                { lang: 'ru', label: '', value: '' }
            ]
        },

        {
            name: 'select_1',
            type: 'select',
            multiple: false,
            langs: [
              { lang: 'uk', label: '', value: '', options: [] },
              { lang: 'ru', label: '', value: '', options: [] }
            ]
        }
    ]
})

export const mutations = {

    clear(state) {
        state.schema = []
    },

    setCategories(state) {
        
        let labels = [['Назва', 'Название'], ['Підкатегорії', 'Подкатегории']]

        labels.forEach((item, index) => {
            let field = JSON.parse(JSON.stringify(state.fields[index]))
            field.langs.forEach((lang, idx) => lang.label = labels[index][idx])
            state.schema.push(field)
        })

        state.schema[1].multiple = true
        state.schema[1].langs.forEach(lang => lang.value = [])
    },

    setFilters(state) {

        let labels = [['Назва', 'Название'], ['Фільтр', 'Фильтр']]
        
        labels.forEach((item, index) => {
            let field = JSON.parse(JSON.stringify(state.fields[0]))
            field.langs.forEach((lang, idx) => lang.label = labels[index][idx])
            state.schema.push(field)
        })

        state.schema[1].name = 'input_2'
    },

    setSubcategories(state) {

        let labels = [['Назва', 'Название'], ['Фільтр', 'Фильтр']]
        
        labels.forEach((item, index) => {
            let field = JSON.parse(JSON.stringify(state.fields[index]))
            field.langs.forEach((lang, idx) => lang.label = labels[index][idx])
            state.schema.push(field)
        })
    },

    setSelectOptions(state, payload) {

        let select = state.schema.find(item => item.type === 'select')

        select.langs.forEach(lang => {
            lang.options = payload.map(option => {
              return option.name.langs.find(item => item.lang === lang.lang).value
            })
        })
    },

    updateSchema(state, payload) {
        state.schema = payload
    }
}