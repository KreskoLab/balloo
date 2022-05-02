export const state = () => ({
  list: [],
  subcategory: {},
})

export const mutations = {
  setList(state, categories) {
    state.list = categories.map((category) => ({
      ...category,
      name: category.name.value,
      subcategories: category.subcategories.map(({ products, name, ...rest }) => ({
        ...rest,
        name: name.value,
        products: products.length,
      })),
    }))
  },

  setSubcategory(state, slug) {
    for (const category of state.list) {
      const subcategory = category.subcategories.find((subcategory) => subcategory.slug === slug)

      if (subcategory) {
        state.subcategory = subcategory
      }
    }
  },
}

export const actions = {
  async getCategories({ commit }) {
    await this.$axios
      .$get('api/categories')
      .then((res) => {
        commit('setList', res)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}

export const getters = {
  getSubcategoriesBySlug: (state) => (slug) => {
    if (state.list.length > 0) {
      return state.list.find((category) => category.slug === slug).subcategories
    } else {
      return []
    }
  },

  getCategoryBySlug: (state) => (slug) => {
    if (state.list.length > 0) {
      return state.list.find((category) => category.slug === slug)
    } else {
      return {}
    }
  },

  getSubcategory: (state) => {
    return state.subcategory
  },

  getSubcategoryBySlug: (state) => (slug) => {
    for (const category of state.list) {
      const subcategory = category.subcategories.find((subcategory) => subcategory.slug === slug)

      if (subcategory) {
        return subcategory
      }
    }
  },

  getSubcategories: (state) => {
    const listCopy = JSON.parse(JSON.stringify(state.list))

    listCopy.forEach((category, index, arr) => {
      arr[index].subcategories = category.subcategories.map((subcategory) => ({
        ...subcategory,
        category: category.slug,
      }))
    })

    return listCopy.map((category) => category.subcategories).flat()
  },
}
