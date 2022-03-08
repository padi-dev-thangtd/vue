<template>
  <div>
    <img src="~/assets/images/coupon.png" alt="" loading="lazy" class="cursor-pointer mt-4">
    <div class="voucher-main">
      <div v-for="coupon in dataCoupon" :key="coupon._id">
        <BaseVoucher
          :bgRed="coupon.logo == 'red' ? true : false"
          :bgBlue="coupon.logo == 'blue' ? true : false"
          :bgGreen="coupon.logo == 'green' ? true : false"
          :nameVoucher="coupon.nameVoucher"
          :title="`Áp dụng cho đơn hàng trên ${coupon.apply}đ`"
          :expiryDate="coupon.baseDate"
          class="mb-4"
          :coin="coupon.coin"
          buyVoucher
          @click="handleClick(coupon._id, coupon.coin)"
        />
        <a-modal
          title="Thông Báo"
          :visible="visibleModalBuy"
          @ok="handleOk(coupon._id)"
          @cancel="handleCancel"
        >
          <p>Bạn chắc chắn muốn mua voucher này không ?</p>
        </a-modal>
      </div>
    </div>

    <img src="~/assets/images/freeship.png" alt="" loading="lazy" class="cursor-pointer">
    <div class="voucher-main">
      <div v-for="freeship in dataFreeship" :key="freeship._id">
        <BaseVoucher
          :bgRed="freeship.logo == 'red' ? true : false"
          :bgBlue="freeship.logo == 'blue' ? true : false"
          :bgGreen="freeship.logo == 'green' ? true : false"
          :nameVoucher="freeship.nameVoucher"
          :title="`Áp dụng cho đơn hàng trên ${freeship.apply}đ`"
          :expiryDate="freeship.baseDate"
          class="mb-4"
          :coin="freeship.coin"
          buyVoucher
          @click="handleClick(freeship._id, freeship.coin)"
        />
      </div>
    </div>

    <a-modal
      title="Thông Báo"
      :visible="visibleModalCheck"
      @ok="handleOkCheck"
      @cancel="handleCancel"
    >
      <p>{{ checkCoin ? 'Bạn không đủ xu để mua voucher này !' : 'Voucher này bạn đã tồn tại ?'}}</p>
    </a-modal>
  </div>
</template>

<script>
import { BIcon, BIconXCircle, BIconStarFill } from 'bootstrap-vue';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {
    BIconXCircle,
    BIcon,
    BIconStarFill
  },
  data() {
    return {
      dataCoupon: null,
      dataFreeship: null,
      visibleModalBuy: false,
      visibleModalCheck: false,
      voucherClick: null,
      checkCoin: false,
    };
  },

  computed: {
    ...mapState({
      listVoucher: state => state.vouchers.listVoucher,
    })
  },

  async created() {
    await this.$store.dispatch('vouchers/getListVoucher');

    let dataListVoucher = this.listVoucher.filter(it => {
      return moment().isBefore(it.baseDate);
    });

    this.dataCoupon = dataListVoucher.filter(it => {
      return it.nameVoucher.toLowerCase().includes('coupon');
    })
    this.dataFreeship = dataListVoucher.filter(it => {
      return ['freeship', 'free ship'].includes(it.nameVoucher.toLowerCase());
    })
  },

  methods: {
    ...mapActions({
      getUserInfo: 'users/getUserInfo',
      updateUser: 'users/updateUser',
    }),
    handleClick(voucherId, coin) {
      let coinUser = localStorage.getItem('coin_user');
      if (coinUser > coin) {
        this.voucherClick = voucherId;
        this.visibleModalBuy = true;
      } else {
        this.checkCoin = true;
        this.visibleModalCheck = true;
      }
    },

    async handleOk() {
      let token = JSON.parse(localStorage.getItem('data_login')).token;
      let userInfo = await this.getUserInfo(token);
      let checkVoucher = userInfo.voucher.includes(this.voucherClick);
      if (checkVoucher) {
        this.visibleModalCheck = true;
      } else {
        userInfo.voucher.push(this.voucherClick);
        await this.updateUser(userInfo);
      }
      this.visibleModalBuy = false;
      this.$router.push('/user/voucher/');
    },

    handleOkCheck() {
      this.visibleModalCheck = false;
    },

    handleCancel() {
      this.visibleModalBuy = false;
      this.visibleModalCheck = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .voucher-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 40px;
  }

</style>