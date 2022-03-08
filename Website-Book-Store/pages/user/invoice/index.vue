<template>
  <div>
    <div class="text-center mb-3">
      <p class="font-24px font-weight-bold">Quản Lý Đơn Hàng</p>
    </div>
    <div v-if="listInvoice">
      <div class="order-status__title">
        <p class="font-16px">Mã đơn hàng</p>
        <p class="font-16px">Ngày đặt hàng</p>
        <p class="font-16px">Tổng tiền</p>
        <p class="font-16px">Trạng thái đơn hàng</p>
        <p class="font-16px">Thông tin đơn hàng</p>
      </div>
      <section class="bg-white cart-user">
        <div class="cart-content pr-0" v-for="invoice in listInvoice" :key="invoice._id">
          <p class="txt-origin font-16px font-weight-bold">{{ invoice._id }}</p>
          <div class="cart-content__info">
            <p class="font-16px ">{{ invoice.baseDate }}</p>
          </div>
          <div class="cart-content__payment">
            <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
          </div>
          <div class="cart-content__delivery">
            <p class="font-18px txt-red font-weight-bold">{{ handleStatus(invoice) }}</p>
          </div>
          <div>
            <a-button type="primary" @click="$router.push(`/user/invoice/${invoice._id}`)">
                Thông tin đơn hàng
            </a-button>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="text-center my-4">
      <a-icon type="shopping-cart" />
      <p class="my-3">Chưa có sản phẩm trong giỏ hàng của bạn.</p>
      <b-button pill variant="outline-danger" @click="$router.push('/')">TIẾP TỤC MUA SẮM</b-button>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
export default {
  layout: 'user',
  data() {
    return {
      listInvoice: null,
    }
  },

  async created() {
    let token = process.browser ? JSON.parse(localStorage.getItem('data_login')).token : '';
    this.listInvoice = await this.$store.dispatch('users/getInvoice', token);
    _.isEmpty(this.listInvoice) ? this.listInvoice = null : '';
  },

  methods: {
    handleStatus(invoice) {
      if (_.isEmpty(invoice.invoiceDetail)) {
        return 'Chờ xác nhận';
      } else {
        let endOfArray =_.takeRight(invoice.invoiceDetail);
        if (endOfArray[0].status == 1) {
          return 'Đợi lấy hàng';
        } else if (endOfArray[0].status == 2) {
          return 'Đã giao';
        } else if (endOfArray[0].status == 3) {
          return 'Thành công';
        } else {
          return 'Đơn hủy';
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '~/assets/style/page/cart';

  .cart-content {
    grid-template-columns: 17% 40% 18% 25% !important;

    &:hover {
      background: #f3f3f1;
    }
  }

  .cart-user {
    div:last-child {
      border: none;
    }
  }

  .anticon-shopping-cart {
    font-size: 100px;
    color: #dcdcdc;
  }

  .btn-outline-danger {
    padding: 10px 25px;
  }

  .cart-content {
    grid-template-columns: 25% 15% 15% 25% 20% !important;
    text-align: center;

    &:hover {
      background: #f3f3f1;
    }
  }

  .order-status {
    &__title {
      display: grid;
      grid-template-columns: 25% 15% 15% 25% 20%;
      text-align: center;
      border-bottom: 1px solid #a7a7aa;
      height: 35px;
    }
  }
</style>
