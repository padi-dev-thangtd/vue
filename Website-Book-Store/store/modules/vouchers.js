export default {
  namespaced: true,
  state() {
    return {
      listVoucher: [],
    }
  },

  mutations: {
    setListVoucher(state, payload) {
      state.listVoucher = payload;
    },
  },

  actions: {
    async getListVoucher(context, params = null) {
      try {
        const resApi = await this.$axios.get('vouchers/');
        context.commit('setListVoucher', resApi.vouchers);
      } catch(err) {
        console.log(err);
      }
    },

    async addListVoucher(context, params = null) {
      try {
        const resApi = await this.$axios.post('vouchers/', params);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },

    async deleteVoucher(context, voucherId = null) {
      try {
        const resApi = await this.$axios.delete(`vouchers/${voucherId}`);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },

    async getVoucherId(context, voucherId = null) {
      try {
        console.log({voucherId})
        const resApi = await this.$axios.get(`vouchers/${voucherId}`);
        return resApi.voucher;
      } catch(err) {
        console.log(err);
      }
    },

    async updateVoucherId(context, params = null) {
      try {
        const resApi = await this.$axios.put(`vouchers/${params._id}`, params);
        return resApi;
      } catch(err) {
        console.log(err);
      }
    },
  }
}
