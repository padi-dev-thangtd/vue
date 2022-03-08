<template>
  <div>
    <div class="card-container">
    <a-tabs type="card">
      <a-tab-pane key="1" tab="Voucher được sử dụng">
        <div v-if="!!dataVoucherUser.length" class="container-voucher">
          <div v-for="voucher in dataVoucherUser" :key="voucher._id">
            <BaseVoucher
              :bgRed="voucher.logo == 'red' ? true : false"
              :bgBlue="voucher.logo == 'blue' ? true : false"
              :bgGreen="voucher.logo == 'green' ? true : false"
              :nameVoucher="voucher.nameVoucher"
              :title="`Áp dụng cho đơn hàng trên ${voucher.apply}đ`"
              :expiryDate="voucher.baseDate"
              :coin="voucher.coin"
              class="mb-4"
              @click="handleUseVoucher(voucher)"
            />
          </div>
        </div>
        <div v-else class="d-flex justify-content-center">Không có Voucher nào !</div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Voucher đã sử dụng">
        <div v-if="!!dataVoucherUsed.length" class="container-voucher">
          <div v-for="voucher in dataVoucherUsed" :key="voucher._id">
            <BaseVoucher
              :bgRed="voucher.logo == 'red' ? true : false"
              :bgBlue="voucher.logo == 'blue' ? true : false"
              :bgGreen="voucher.logo == 'green' ? true : false"
              :nameVoucher="voucher.nameVoucher"
              :title="`Áp dụng cho đơn hàng trên ${voucher.apply}đ`"
              :expiryDate="voucher.baseDate"
              :coin="voucher.coin"
              class="mb-4"
              :isShowBtn="false"
            />
          </div>
        </div>
        <div v-else class="d-flex justify-content-center">Không có Voucher nào !</div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Voucher hết hạn">
        <div v-if="!!dataVoucherExpired.length" class="container-voucher">
          <div v-for="voucher in dataVoucherExpired" :key="voucher._id">
            <BaseVoucher
              :bgRed="voucher.logo == 'red' ? true : false"
              :bgBlue="voucher.logo == 'blue' ? true : false"
              :bgGreen="voucher.logo == 'green' ? true : false"
              :nameVoucher="voucher.nameVoucher"
              :title="`Áp dụng cho đơn hàng trên ${voucher.apply}đ`"
              :expiryDate="voucher.baseDate"
              :coin="voucher.coin"
              disabled
              :isShowBtn="false"
              class="mb-4"
            />
          </div>
        </div>
        <div v-else class="d-flex justify-content-center">Không có Voucher nào !</div>
      </a-tab-pane>
    </a-tabs>
  </div>

  </div>

</template>

<script>
import BaseVoucher from '@/components/formItems/baseVoucher';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'user',
  components: {
    BaseVoucher
  },
  data() {
    return {
      dataVoucherUser: [],
      dataVoucherUsed: [],
      dataVoucherExpired: []
    };
  },

  computed: {
    ...mapState({
      listVoucher: state => state.vouchers.listVoucher,
    })
  },

  async created() {
    let token = process.browser ? JSON.parse(localStorage.getItem('data_login')).token : '';
    let userInfo = await this.$store.dispatch('users/getUserInfo', token);
    await this.$store.dispatch('vouchers/getListVoucher');

    let voucherCheck = userInfo.voucher.reduce((arr, it) => {
      return [...arr, this.listVoucher.find(item => item._id == it)]
    }, []);
    this.dataVoucherExpired = voucherCheck.filter(it => {
      return moment().isAfter(it.baseDate);
    });
    this.dataVoucherUsed = userInfo.usedVoucher.reduce((arr, it) => {
      return [...arr, this.listVoucher.find(item => item._id == it)]
    }, []);
    this.dataVoucherUser = voucherCheck.filter(x => this.dataVoucherUsed.indexOf(x) === -1 && moment().isBefore(x.baseDate));
  },

  methods: {
    handleUseVoucher(voucher) {
      localStorage.setItem('data_voucher', JSON.stringify(voucher))
      this.$router.push('/checkout/cart/');
    }
  }
}
</script>

<style lang="scss" scoped>
  .container-voucher {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

  }
</style>
