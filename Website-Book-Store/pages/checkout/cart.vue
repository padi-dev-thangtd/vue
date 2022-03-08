<template>
  <div>
    <div class="font-20px txt-black-5 my-3">GIỎ HÀNG</div>
    <div class="cart">
      <section class="bg-white">
        <div v-if="dataCart.length > 0" class="cart-container cart-container-css d-flex flex-column justify-content-between">
          <div v-for="cart in dataCart" :key="cart._id" class="d-flex align-items-center cart-container__content">
            <div class="ml-3 cart-icon" @click="handleDeleteCart(cart._id)">
              <b-icon icon="x-circle" scale="2" variant="danger" class="ml-3 cursor-pointer"></b-icon>
            </div>
            <div class="cart-content w-100" @click="$router.push(`/books/${cart.productId}`)">
              <img :src="cart.image" alt="" width="150" height="150" loading="lazy" class="cursor-pointer">
              <div class="cart-content__info">
                <p class="font-16px mb-2 cursor-pointer">{{ cart.name }}</p>
                <p class="font-16px font-weight-bold">{{ cart.price | numberWithCommas }} đ</p>
              </div>
              <div class="cart-content__payment">
                <p class="font-16px">Số Lượng</p>
                <p class="text-center font-16px font-weight-bold">{{ cart.remain }}</p>
              </div>
              <div class="cart-content__payment">
                <p class="font-16px">Thành Tiền</p>
                <p class="txt-origin text-center font-16px font-weight-bold">{{ cart.remain * cart.price | numberWithCommas }}</p>
              </div>
            </div>
          </div>
          <b-button class="btn-redirect" pill variant="outline-danger" @click="$router.push('/')">TIẾP TỤC MUA SẮM</b-button>
        </div>
        <div v-else class="text-center my-4 shopping">
          <a-icon type="shopping-cart" />
          <p class="my-3">Chưa có sản phẩm trong giỏ hàng của bạn.</p>
          <b-button pill variant="outline-danger" @click="$router.push('/')">TIẾP TỤC MUA SẮM</b-button>
        </div>
      </section>
      <aside>
        <div class="container-static">
          <div class="cart-sale bg-white">
            <div class="cart-sale__promotion pb-2">
              <b-icon icon="star-fill" animation="fade" font-scale="2" class="txt-red mr-2"></b-icon>
              <span>KHUYẾN MÃI</span>
            </div>
            <div class="cart-sale__info mt-2">
              <div>
                <p class="font-16px font-weight-bold mb-2">VNPAY: GIẢM GIÁ NGAY 30%</p>
                <p>Nhập mã "QRDAY", giảm ngay 30%, đơn hàng từ 59K, thanh toán qua...</p>
                <p class="txt-red font-weight-bold mt-2">* Áp dụng ngay thanh toán qua VNPAY, nhận mã tại App Banking</p>
              </div>
              <div class="ml-2">
                <b-button pill variant="outline-success" @click="$router.push('/user/point/')">Áp dụng</b-button>
              </div>
            </div>
          </div>
          <div class="cart-sale__payment bg-white mt-3">
            <div class="into-money pb-3">
              <p class="font-16px">Thành tiền</p>
              <p class="font-16px">{{ totalMoney | numberWithCommas }} đ</p>
            </div>
            <div class="total-money mt-3">
              <p class="font-16px font-weight-bold">Tổng Số Tiền (gồm VAT)</p>
              <p class="font-20px font-weight-bold txt-origin">{{ totalMoney | numberWithCommas }}đ</p>
            </div>
            <div class="btn-payment text-center mt-3">
              <b-button :disabled="dataCart.length <= 0" pill variant="danger" @click="handlePayment">THANH TOÁN</b-button>
              <a-modal
                title="Thông Báo"
                :visible="visibleModal"
                @ok="handleOk"
                @cancel="handleCancel"
              >
                <p>Mời quý khách đăng nhập để có thể thanh toán !</p>
              </a-modal>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconXCircle, BIconStarFill } from 'bootstrap-vue';
import { mapActions } from 'vuex';
export default {
  components: {
    BIconXCircle,
    BIcon,
    BIconStarFill
  },

  data() {
    return {
      dataCart: [],
      totalMoney: 0,
      visibleModal: false
    }
  },

  async created() {
  },

  async mounted() {
    let dataLogin = JSON.parse(localStorage.getItem('data_login'));
    if (dataLogin) {
      this.dataCart = await this.$store.dispatch('users/getCart', (JSON.parse(localStorage.getItem('data_login'))).token);
      if (this.dataCart.length == 1) {
        this.totalMoney = this.dataCart[0].price * this.dataCart[0].remain;
      } else if (this.dataCart.length > 1) {
        let total = 0;
        this.dataCart.forEach(it => {
          total = total + (it.price * it.remain);
        })
        this.totalMoney = total;
      } else {
        this.totalMoney = 0;
      }
    }
  },

  methods: {
    ...mapActions({
      getCart: 'users/getCart',
      deleteCart: 'users/deleteCart',
    }),

    handleDeleteCart(cartId) {
      if (confirm("Bạn chắc chắn muốn xóa sản phẩm này không ?")) {
        this.$store.commit('setLoading', true);
        setTimeout( async () => {
          let dataDeleteCart = {
            userId: (JSON.parse(localStorage.getItem('data_login'))).token,
            cartId
          }
          let resultDelete = await this.deleteCart(dataDeleteCart);
          if (resultDelete.success) {
            this.dataCart = await this.$store.dispatch('users/getCart', (JSON.parse(localStorage.getItem('data_login'))).token);
            this.$store.commit('users/setCartNumber', this.dataCart.length);
          }

          if (this.dataCart.length == 1) {
            this.totalMoney = this.dataCart[0].price * this.dataCart[0].remain;
          } else if (this.dataCart.length > 1) {
            let total = 0;
            this.dataCart.forEach(it => {
              total = total + (it.price * it.remain);
            })
            this.totalMoney = total;
          } else {
            this.totalMoney = 0;
          }
          this.$store.commit('setLoading', false);
        },2000);
      }
    },

    handlePayment() {
      let dataLogin = JSON.parse(localStorage.getItem('data_login'));

      if (dataLogin) {
        this.$router.push('/checkout/payment/');
      } else {
        this.visibleModal = true;
      }
    },

    handleCancel() {
      this.visibleModal = false;
    },

    handleOk() {
      this.visibleModal = false;
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/style/page/cart';

  .shopping {
    padding-top: 65px;
  }

  .anticon-shopping-cart {
    font-size: 100px;
    color: #dcdcdc;
  }
  .cart-container-css{
    height: 100%;
  }
  .btn-redirect{
    max-width: 320px;
    margin: 15px 20px;
  }
</style>
