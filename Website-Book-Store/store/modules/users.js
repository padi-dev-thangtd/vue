export default {
  namespaced: true,
  state() {
    return {
      listUser: [],
      cartNumber: 0
    };
  },

  mutations: {
    setListUser(state, payload) {
      state.listUser = payload;
    },
    setCartNumber(state, payload) {
      state.cartNumber = payload;
    }
  },

  actions: {
    async getListUser(context, params = null) {
      try {
        const resApi = await this.$axios.get("users/");
        context.commit("setListUser", resApi.users);
      } catch (err) {
        console.log(err);
      }
    },

    async addUser(context, params = null) {
      try {
        const resApi = await this.$axios.post("users/", params);
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser(context, userId = null) {
      try {
        const resApi = await this.$axios.delete(`users/${userId}`);
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async getUserInfo(context, userId = null) {
      try {
        const resApi = await this.$axios.get(`users/${userId}`);
        return resApi.user;
      } catch (err) {
        console.log(err);
      }
    },

    async updateUser(context, params = null) {
      try {
        const resApi = await this.$axios.put(`users/${params._id}`, params);
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async decreaseVoucher(context, params = null) {
      try {
        const resApi = await this.$axios.patch(`vouchers/decreaseVoucher/${params.voucherId}`, params);
        console.log('hihihi')
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    // Cart
    async getCart(context, params) {
      try {
        const resApi = await this.$axios.get(`users/${params}/cart`);
        return resApi.cart;
      } catch (err) {
        console.log(err);
      }
    },

    async getCartApi(context, params) {
      try {
        const resApi = await this.$axios.get(`users/${params}/cart`);
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async addCart(context, params = null) {
      try {
        const resApi = await this.$axios.post(
          `users/${params.userId}/cart`,
          params.data
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async updateCart(context, params = null) {
      try {
        const resApi = await this.$axios.patch(
          `users/${params.userId}/cart/${params.cartId}`,
          params.data
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteCart(context, params = null) {
      try {
        const resApi = await this.$axios.delete(
          `users/${params.userId}/cart/${params.cartId}`
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    // delete all Cart
    async deleteAllCart(context, params = null) {
      try {
        const resApi = await this.$axios.delete(
          `users/${params.userId}/cart/deleteMany`
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    //Invoice
    async getInvoice(context, params) {
      try {
        const resApi = await this.$axios.get(`users/${params}/invoice`);
        return resApi.invoice;
      } catch (err) {
        console.log(err);
      }
    },

    async getInvoiceId(context, params) {
      try {
        const resApi = await this.$axios.get(
          `users/${params.userId}/invoice/${params.invoiceId}`
        );
        return resApi.invoiceId;
      } catch (err) {
        console.log(err);
      }
    },

    async getInvoiceAll(context, params) {
      try {
        const resApi = await this.$axios.get("users/invoice/all");
        return resApi.invoiceAll;
      } catch (err) {
        console.log(err);
      }
    },

    async getInvoiceAllResponse(context, params) {
      try {
        const resApi = await this.$axios.get("users/invoice/all");
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async addInvoice(context, params = null) {
      try {
        const resApi = await this.$axios.post(
          `users/${params.userId}/invoice`,
          params.data
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    },

    async updateInvoice(context, params = null) {
      try {
        console.log("api", params);
        const resApi = await this.$axios.put(
          `users/${params.userId}/invoice/${params.invoiceId}`,
          params.data
        );
        return resApi;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
