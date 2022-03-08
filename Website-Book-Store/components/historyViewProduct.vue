<template>
  <div class="history-view">
    <div class="history-view__content" v-if="showContent">
      <div class="d-flex flex-wrap">
        <b-card
          :img-src="item.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 10rem;"
          class="card-items mr-3 mb-2 d-flex"
          loading="lazy"
          @click="handleProductInfo(item._id)"
          v-for="item in dataHistory" :key="item._id"
        >
          <b-card-text>
            {{ item.name }}
          </b-card-text>
          <p>
            <span class="font-16px font-weight-bold txt-origin">{{ item.price }} ₫</span>
            <b-badge variant="danger" class="ml-1 font-10px">-{{ item.sale }}%</b-badge>
          </p>
        </b-card>
      </div>
    </div>
    <div class="history-view__btn" :class="showContent ? 'history-view__btn-show' : 'history-view__btn-hide'" @click="showContent = !showContent">
      <a-icon type="history" />
      <p class="ml-2 font-16px">Sản phẩm đã xem</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      showContent: false,
      dataHistory: null,
      item: {
        _id: '608189c6507c82231859c0a0',
        image: 'http://bizweb.dktcdn.net/thumb/grande/100/370/339/products/885845868fc875962cd9.jpg?v=1587042283737',
        name: 'Cân Bằng Cảm Xúc, Cả Lúc Bão Giông ngu dananananan',
        price: 200000,
        sale: '10'
      }
    }
  },

  watch: {
    $route(to, from) {
      this.handleDataLocal();
    }
  },

  computed: {
    ...mapState({
      listProducts: state => state.products.listProducts,
    })
  },

  async created() {
    let dataHistoryLocal = process.browser ? JSON.parse(localStorage.getItem('history_view')) : '';
    await this.$store.dispatch('products/getListProduct');
    this.dataHistory = this.listProducts ? this.listProducts.filter(function(e) {
      return dataHistoryLocal ? dataHistoryLocal.indexOf(e._id) > -1 : '';
    }) : '';
  },

  methods: {
    handleShow() {
      this.showContent = true;
    },
    async handleDataLocal() {
      let dataHistoryLocal = JSON.parse(localStorage.getItem('history_view'));
      this.dataHistory = this.listProducts.filter(function(e) {
        return dataHistoryLocal ? dataHistoryLocal.indexOf(e._id) > -1 : '';
      });
    },
    handleProductInfo(productId) {
      this.$router.push(`/books/${productId}`);
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/style/components/historyProduct'
</style>
