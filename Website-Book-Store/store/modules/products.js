export default {
  namespaced: true,
  state() {
    return {
      listProducts: [],
      listProductSearch: [],
      productInfo: null,
    }
  },

  mutations: {
    setListProduct(state, payload) {
      state.listProducts = payload;
    },
    setListProductSearch(state, payload) {
      console.log('aa', payload);
      state.listProductSearch = payload;
    },
    setProductInfo(state, payload) {
      state.productInfo = payload;
    }
  },

  actions: {
    async getListProduct(context, params = null) {
      try {
        const resApi = await this.$axios.get('products/');
        context.commit('setListProduct', resApi.products);
      } catch(err) {
        console.log(err);
      }
    },

    setListProductsSearch(context, data) {
      context.commit('setListProductSearch', data);
    },

    async addListProduct(context, params = null) {
      try {
        const resApi = await this.$axios.post('products/', params);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },

    async deleteProduct(context, productId = null) {
      try {
        const resApi = await this.$axios.delete(`products/${productId}`);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },

    async getProductId(context, productId = null) {
      try {
        const resApi = await this.$axios.get(`products/${productId}`);
        return resApi.product;
      } catch(err) {
        console.log(err);
      }
    },

    async updateProductId(context, params = null) {
      try {
        const resApi = await this.$axios.put(`products/${params._id}`, params);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },
  }
}
