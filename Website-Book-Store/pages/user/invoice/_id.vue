<template>
  <div class="p-3">
    <div class="invoice-info mb-4">
      <p class="d-flex align-items-center font-16px txt-black-3 cursor-pointer" @click="$router.push('/user/invoice/')">
        <a-icon type="left" class="mr-1" />TRỞ LẠI
      </p>
      <div class="font-16px">
        <span>ID ĐƠN HÀNG: {{ invoiceInfo ? invoiceInfo._id  : '' }}&nbsp; &nbsp;|</span>
        <span class="txt-red ml-2">{{ invoiceInfo ? invoiceInfo.invoiceDetail.length == 0 ? 'ĐANG XỬ LÝ' : 'ĐÃ GIAO' : '' }}</span>
      </div>
    </div>
    <div class="mb-4">
      <a-steps :current="handleCurrent(invoiceInfo)" status="error" class="p-2">
        <a-step>
          <template slot="title">
            Đặt hàng
          </template>
          <p slot="title" :class="dataOrder ? 'txt-green' : ''">{{ dataOrder ? 'Thành công' : 'Đang chờ' }}</p>
          <span slot="description">{{ dataOrder ? dataOrder : '' }}</span>
        </a-step>
        <a-step>
          <template slot="title">
            Giao hàng
          </template>
          <p slot="title" :class="dataDilivery ? 'txt-green' : ''">{{ dataDilivery ? 'Thành công' : 'Đang chờ' }}</p>
          <span slot="description">{{ dataDilivery ? dataDilivery : '' }}</span>
        </a-step>
        <a-step>
          <template slot="title">
            Đơn hàng
          </template>
          <p slot="title" :class="dataInvoice ? 'txt-green' : ''">{{ dataInvoice ? 'Thành công' : checkCancel ? 'Đã hủy' : 'Đang chờ' }}</p>
          <span slot="description">{{ dataInvoice ? dataInvoice : '' }}</span>
        </a-step>
      </a-steps>
    </div>
    <hr>
    <div class="mt-4 p-2 mb-3">
      <p class="font-20px font-weight-bold mb-3">Thông tin cá nhân</p>
      <p class="font-weight-bold mb-2">Họ và Tên: {{ userInfo ? userInfo.name : '' }}</p>
      <p class="txt-black-3">Email: {{ userInfo ? userInfo.email : '' }}</p>
      <p class="txt-black-3">(+84) {{ userInfo ? userInfo.phone : '' }}</p>
      <p class="txt-black-3">{{ userInfo ? userInfo.address : '' }}</p>
    </div>
    <div class="mt-4 p-2 mb-3">
      <p class="font-20px font-weight-bold mb-3">Nội dung Nhận Hàng</p>
      <p class="txt-black-3">{{ invoiceInfo ? invoiceInfo.content : '' }}</p>
    </div>
    <hr>
    <div class="mt-4 p-2 mb-3">
      <p class="font-20px font-weight-bold mb-3">Địa Chỉ Nhận Hàng</p>
      <p class="font-weight-bold mb-2">{{ userInfo ? userInfo.name : '' }}</p>
      <p class="txt-black-3">(+84) {{ userInfo ? userInfo.phone : '' }}</p>
      <p class="txt-black-3">{{ userInfo ? userInfo.address : '' }}</p>
    </div>
    <hr>
    <div class="mt-4 p-2 mb-3">
      <p class="font-20px font-weight-bold mb-3">Phương Thức Thanh Toán</p>
      <p class="txt-black-3">Thanh toán khi nhận hàng</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  data() {
    return {
      invoiceInfo: null,
      userInfo: null,
      dataOrder: null,
      dataDilivery: null,
      dataInvoice: null,
      checkCancel: false,
    }
  },

  async mounted() {
    let token = process.browser ? JSON.parse(localStorage.getItem('data_login')).token : '';
    let invoiceId = this.$route.params.id;
    let dataInvoiceId = {
      userId: token,
      invoiceId
    }
    this.invoiceInfo = await this.$store.dispatch('users/getInvoiceId', dataInvoiceId);

    if (this.invoiceInfo.invoiceDetail.length == 0) {
      this.dataOrder = null;
    } else if (this.invoiceInfo.invoiceDetail.length == 1) {
      this.dataOrder = this.invoiceInfo.invoiceDetail[0].date;
    } else if (this.invoiceInfo.invoiceDetail.length == 2) {
      this.dataOrder = this.invoiceInfo.invoiceDetail[0].date;
      this.dataDilivery = this.invoiceInfo.invoiceDetail[1].date;
    } else {
      if (this.invoiceInfo.invoiceDetail[2].status == 3) {
        this.dataOrder = this.invoiceInfo.invoiceDetail[0].date;
        this.dataDilivery = this.invoiceInfo.invoiceDetail[1].date;
        this.dataInvoice = this.invoiceInfo.invoiceDetail[2].date;
      } else {
        this.dataOrder = this.invoiceInfo.invoiceDetail[0].date;
        this.dataDilivery = this.invoiceInfo.invoiceDetail[1].date;
      }
    };

    this.userInfo = await this.$store.dispatch('users/getUserInfo', token);
    console.log({userInfo: this.userInfo})
  },

  methods: {
    handleCurrent(data) {
      if (data && data.invoiceDetail.length === 3) {
        let checkInvoice = data.invoiceDetail.some(it => it.status === 4);
        if (checkInvoice) {
          this.checkCancel = true;
          return 2;
        }
      }
      return data && data.invoiceDetail.length;
    }
  }
}
</script>

<style lang="scss" scoped>
  .invoice-info {
    display: flex;
    justify-content: space-between;
  }
</style>
