<template>
  <div>
    <div class="text-center mb-3">
      <p class="font-24px font-weight-bold">Xu Tích Luỹ</p>
    </div>
    <div class="d-flex justify-content-center align-items-center my-4">
      <a-icon type="dollar" class="icon-dol"/>
      <span class="coin-number ml-2">{{ totalCoin | numberWithCommas }}</span>
    </div>
    <p class="text-center">Bạn có <span class="txt-red font-16px">{{ totalCoin | numberWithCommas }}</span> xu trong tài khoản của bạn</p>
    <div class="p-3">
      <hr>
      <p class="font-weight-500 font-18px mt-2 mb-2">Đổi quà tặng từ Xu tích luỹ</p>
      <div class="text-center"><b-button variant="outline-warning btn-gift" @click="handleGift">Đổi quà Voucher</b-button></div>
    </div>
    <div class="p-3">
      <hr>
      <p class="font-weight-500 font-18px mt-2 mb-2">Giới thiệu về Xu tích luỹ</p>
      <ul style="list-style-type:circle" class="guide-coin">
        <li>Xu là hệ thống điểm thưởng dành cho khách hàng của nhà sách Tiền Phong</li>
        <li>Khách hàng sẽ nhận được xu khi mua các sản phẩm từ cửa hàng với các mức độ :</li>
        <p>Đơn hàng 0đ -> 100.000đ khách hàng sẽ nhận 50 xu</p>
        <p>Đơn hàng 100.000đ -> 200.000đ khách hàng sẽ nhận 100 xu</p>
        <p>Đơn hàng 200.000đ -> 500.000đ khách hàng sẽ nhận 200 xu</p>
        <p>Đơn hàng trên 500.000đ khách hàng sẽ nhận 400 xu</p>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'user',
  data() {
    return {
      totalCoin: 0
    };
  },

  computed: {
    ...mapState({
      listVoucher: state => state.vouchers.listVoucher,
    })
  },

  async created() {
    let token = process.browser ? JSON.parse(localStorage.getItem('data_login')).token : '';
    let invoiceInfo = await this.$store.dispatch('users/getInvoice', token);
    let userInfo = await this.$store.dispatch('users/getUserInfo', token);
    await this.$store.dispatch('vouchers/getListVoucher');

    let coinInvoice = 0;
    invoiceInfo.forEach(it => {
      if (it.money <= 100000) {
        return coinInvoice += 50;
      } else if (100000 < it.money && it.money <= 200000) {
        return coinInvoice += 100;
      } else if (200000 < it.money && it.money <= 500000) {
        return coinInvoice += 200;
      } else {
        return coinInvoice += 400;
      }
    });

    let voucherCheck = userInfo.voucher.reduce((arr, it) => {
      return [...arr, this.listVoucher.find(item => item._id == it)]
    }, []);
    let coinVoucher = 0;
    voucherCheck.forEach(it => coinVoucher += it.coin);

    this.totalCoin = coinInvoice - coinVoucher;
  },

  methods: {
    handleGift() {
      localStorage.setItem('coin_user', this.totalCoin)
      this.$router.push('/checkout/voucher');
    }
  }
}
</script>

<style lang="scss" scoped>
  .anticon-dollar {
    font-size: 50px;
    color: #ffe100;
  }

  .coin-number {
    font-size: 40px;
    color: #87da09;
  }

  .guide-coin {
    p {
      color: #5f5fb1;
    }
  }

  .btn-gift {
    border-radius: 20px;
    padding: 8px 20px !important;
  }
</style>
