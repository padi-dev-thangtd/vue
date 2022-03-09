<template>
  <div>
     <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer">Orders</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="card-container">
      <a-tabs type="card" @change="changeTab">
        <a-tab-pane key="1" tab="Tất cả">
          <div class="order-status__title order-status__title-all">
            <p class="font-16px">Mã đơn hàng</p>
            <p class="font-16px">Ngày đặt hàng</p>
            <p class="font-16px">Tổng tiền</p>
            <p class="font-16px">Trạng thái đơn hàng</p>
            <p class="font-16px">Thông tin đơn hàng</p>
          </div>
          <section class="bg-white cart-user">
            <div class="cart-content cart-content-all pr-0" v-for="invoice in dataInvoiceAll" :key="invoice._id">
              <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
              <div class="cart-content__info">
                <p class="font-16px ">{{ invoice.baseDate }}</p>
              </div>
              <div class="cart-content__payment">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }}đ</p>
              </div>
              <div class="cart-content__delivery">
                <p class="font-18px txt-red font-weight-bold">{{ handleStatus(invoice) }}</p>
              </div>
              <div>
                <a-button type="primary" @click="$router.push('/checkout/payment/')">
                  <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                    Thông tin đơn hàng
                  </nuxt-link>
                </a-button>
              </div>
            </div>
          </section>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Chờ xác nhận">
          <div v-if="!!dataConfirm.length">
            <div class="order-status__title">
              <p class="font-16px">Mã đơn hàng</p>
              <p class="font-16px">Ngày đặt hàng</p>
              <p class="font-16px">Tổng tiền</p>
              <p class="font-16px">Trạng thái đơn hàng</p>
              <p class="font-16px">Thông tin đơn hàng</p>
              <p class="font-16px">Xác nhận</p>
            </div>
            <section class="bg-white cart-user">
              <div class="cart-content pr-0" v-for="invoice in dataConfirm" :key="invoice._id">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
                <div class="cart-content__info">
                  <p class="font-16px ">{{ invoice.baseDate }}</p>
                </div>
                <div class="cart-content__payment">
                  <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
                </div>
                <div>
                  <a-button type="yellow">
                    <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                      Thông tin đơn hàng
                    </nuxt-link>
                  </a-button>
                </div>
                <div>
                  <a-button type="primary" @click="handleConfirm(invoice._id, invoice.owner, 'confirm')">Xác nhận</a-button>
                </div>
                <div>
                  <a-button type="danger" @click="handleConfirm(invoice._id, invoice.owner, 'cancel')">Hủy đơn hàng</a-button>
                </div>

              </div>
            </section>
          </div>
        <div v-else class="text-center my-4 shopping">
            <a-icon type="shopping-cart" />
            <p class="my-3">Chưa có đơn hàng trong giỏ hàng của bạn.</p>
          </div>
        </a-tab-pane>

        <a-tab-pane key="3" tab="Lấy hàng">
          <div v-if="!!dataTransport.length">
            <div class="order-status__title">
              <p class="font-16px">Mã đơn hàng</p>
              <p class="font-16px">Ngày đặt hàng</p>
              <p class="font-16px">Tổng tiền</p>
              <p class="font-16px">Trạng thái đơn hàng</p>
              <p class="font-16px">Thông tin đơn hàng</p>
              <p class="font-16px">Xác nhận</p>
            </div>
            <section class="bg-white cart-user">
              <div class="cart-content pr-0" v-for="invoice in dataTransport" :key="invoice._id">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
                <div class="cart-content__info">
                  <p class="font-16px ">{{ invoice.baseDate }}</p>
                </div>
                <div class="cart-content__payment">
                  <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
                </div>
                <div>
                  <a-button type="yellow">
                    <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                      Thông tin đơn hàng
                    </nuxt-link>
                  </a-button>
                </div>
                <div>
                  <a-button type="primary" @click="handleConfirm(invoice._id, invoice.owner, 'transport')">Xác nhận</a-button>
                </div>
                <div>
                  <a-button type="danger" @click="handleConfirm(invoice._id, invoice.owner, 'cancel')">Hủy đơn hàng</a-button>
                </div>
              </div>
            </section>
          </div>
        <div v-else class="text-center my-4 shopping">
            <a-icon type="shopping-cart" />
            <p class="my-3">Chưa có đơn hàng trong giỏ hàng của bạn.</p>
          </div>
        </a-tab-pane>

        <a-tab-pane key="4" tab="Giao hoàn thành">
          <div v-if="!!dataComplete.length">
            <div class="order-status__title">
              <p class="font-16px">Mã đơn hàng</p>
              <p class="font-16px">Ngày đặt hàng</p>
              <p class="font-16px">Tổng tiền</p>
              <p class="font-16px">Trạng thái đơn hàng</p>
              <p class="font-16px">Thông tin đơn hàng</p>
              <p class="font-16px">Xác nhận</p>
            </div>
            <section class="bg-white cart-user">
              <div class="cart-content pr-0" v-for="invoice in dataComplete" :key="invoice._id">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
                <div class="cart-content__info">
                  <p class="font-16px ">{{ invoice.baseDate }}</p>
                </div>
                <div class="cart-content__payment">
                  <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
                </div>
                <div>
                  <a-button type="yellow">
                    <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                      Thông tin đơn hàng
                    </nuxt-link>
                  </a-button>
                </div>
                <div>
                  <a-button type="primary" @click="handleConfirm(invoice._id, invoice.owner, 'complete')">Xác nhận</a-button>
                </div>
                <div>
                  <a-button type="danger" @click="handleConfirm(invoice._id, invoice.owner, 'cancel')">Hủy đơn hàng</a-button>
                </div>
              </div>
            </section>
          </div>
        <div v-else class="text-center my-4 shopping">
            <a-icon type="shopping-cart" />
            <p class="my-3">Chưa có đơn hàng trong giỏ hàng của bạn.</p>
          </div>
        </a-tab-pane>

        <a-tab-pane key="5" tab="Hoàn thành">
          <div v-if="!!dataComplete1.length">
            <div class="order-status__title">
              <p class="font-16px">Mã đơn hàng</p>
              <p class="font-16px">Ngày đặt hàng</p>
              <p class="font-16px">Tổng tiền</p>
              <p class="font-16px">Trạng thái đơn hàng</p>
              <p class="font-16px">Thông tin đơn hàng</p>
              <p class="font-16px">Xác nhận</p>
            </div>
            <section class="bg-white cart-user">
              <div class="cart-content pr-0" v-for="invoice in dataComplete1" :key="invoice._id">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
                <div class="cart-content__info">
                  <p class="font-16px ">{{ invoice.baseDate }}</p>
                </div>
                <div class="cart-content__payment">
                  <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
                </div>
                <div>
                  <a-button type="yellow">
                    <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                      Thông tin đơn hàng
                    </nuxt-link>
                  </a-button>
                </div>
                <div>
                  <a-button type="primary" disabled>Xác nhận</a-button>
                </div>
                <div>
                  <a-button type="danger" disabled>Hủy đơn hàng</a-button>
                </div>
              </div>
            </section>
          </div>
        <div v-else class="text-center my-4 shopping">
            <a-icon type="shopping-cart" />
            <p class="my-3">Chưa có đơn hàng trong giỏ hàng của bạn.</p>
          </div>
        </a-tab-pane>

        <a-tab-pane key="6" tab="Đã hủy">
          <div v-if="!!dataCancel.length">
            <div class="order-status__title">
              <p class="font-16px">Mã đơn hàng</p>
              <p class="font-16px">Ngày đặt hàng</p>
              <p class="font-16px">Tổng tiền</p>
              <p class="font-16px">Trạng thái đơn hàng</p>
              <p class="font-16px">Thông tin đơn hàng</p>
              <p class="font-16px">Xác nhận</p>
            </div>
            <section class="bg-white cart-user">
              <div class="cart-content pr-0" v-for="invoice in dataCancel" :key="invoice._id">
                <p class="txt-origin font-16px font-weight-bold">{{ invoice.uid }}</p>
                <div class="cart-content__info">
                  <p class="font-16px ">{{ invoice.baseDate }}</p>
                </div>
                <div class="cart-content__payment">
                  <p class="txt-origin font-16px font-weight-bold">{{ invoice.money | numberWithCommas }} đ</p>
                </div>
                <div>
                  <a-button type="yellow">
                    <nuxt-link :to="{ path: '/checkout/payment/', hash: 'info' }">
                      Thông tin đơn hàng
                    </nuxt-link>
                  </a-button>
                </div>
                <div>
                  <a-button type="primary" disabled>Xác nhận</a-button>
                </div>
                <div>
                  <a-button type="danger" disabled>Hủy đơn hàng</a-button>
                </div>
              </div>
            </section>
          </div>
        <div v-else class="text-center my-4 shopping">
            <a-icon type="shopping-cart" />
            <p class="my-3">Chưa có đơn hàng trong giỏ hàng của bạn.</p>
          </div>
        </a-tab-pane>
      </a-tabs>
      <a-modal
        title="Thông Báo"
        :visible="visibleModal"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <p>Bạn chắc chắn muốn {{ ['confirm', 'transport', 'complete'].includes(activeButton) ? 'xác nhận' : 'hủy'}} đơn hàng này không ?</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      keyTab: '1',
      statusConfirm: '0',
      dataInvoiceAll: null,
      dataConfirm: [],
      dataTransport: [],
      dataComplete: [],
      dataCancel: [],
      dataComplete1: [],
      visibleModal: false,
      dataConfirmRequest: null,
      activeButton: '',
    };
  },
  async created() {
    this.dataInvoiceAll = await this.$store.dispatch('users/getInvoiceAll');

    this.dataConfirm = this.dataInvoiceAll.filter(it => {
      return !it.invoiceDetail.length;
    });
    this.dataTransport = this.dataInvoiceAll.filter(it => {
      return it.invoiceDetail.length === 1 && it.invoiceDetail[0].status === 1;
    });
    this.dataComplete = this.dataInvoiceAll.filter(it => {
      return it.invoiceDetail.length === 2 && it.invoiceDetail[1].status === 2;
    });
    this.dataCancel = this.dataInvoiceAll.filter(it => {
      return it.invoiceDetail.some(item => item.status === 4);
    });
    this.dataComplete1 = this.dataInvoiceAll.filter(it => {
      return it.invoiceDetail.length === 3 && it.invoiceDetail[2].status === 3;
    });
  },
  methods: {
    ...mapActions({
      getInvoiceId: 'users/getInvoiceId',
      updateInvoice: 'users/updateInvoice',
    }),
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
    },

    async handleConfirm(id, owner, btn) {
      this.activeButton = btn;
      this.visibleModal = true;
      // let dataLogin = process.browser ? JSON.parse(localStorage.getItem('data_login')) : '';
      const dataInvoiceId = await this.getInvoiceId({
        userId: owner,
        invoiceId: id,
      });
      let invoiceDetail;
      if (btn === 'confirm') {
        invoiceDetail = [
          {
            "status": 1,
            "date": moment().format('YYYY/MM/DD h:mm')
          },
        ];
      } else if (btn === 'transport') {
        invoiceDetail = [
          ...dataInvoiceId.invoiceDetail,
          {
            "status": 2,
            "date": moment().format('YYYY/MM/DD h:mm')
          },
        ];
      } else if (btn === 'complete') {
        invoiceDetail = [
          ...dataInvoiceId.invoiceDetail,
          {
            "status": 3,
            "date": moment().format('YYYY/MM/DD h:mm')
          },
        ];
      } else {
        invoiceDetail = [
          ...dataInvoiceId.invoiceDetail,
          {
            "status": 4,
            "date": moment().format('YYYY/MM/DD h:mm')
          },
        ];
      }
      const dataConfirm = {
        userId: owner,
        invoiceId: id,
        data: {
          baseDate: dataInvoiceId.baseDate,
          money: dataInvoiceId.money,
          content: dataInvoiceId.content,
          invoiceDetail: invoiceDetail,
        }
      };
      this.dataConfirmRequest = dataConfirm;
    },

    async handleOk() {
      await this.updateInvoice(this.dataConfirmRequest);
      this.dataInvoiceAll = await this.$store.dispatch('users/getInvoiceAll');
      this.dataConfirm = this.dataInvoiceAll.filter(it => {
        return !it.invoiceDetail.length;
      });
      this.dataTransport = this.dataInvoiceAll.filter(it => {
        return it.invoiceDetail.length === 1 && it.invoiceDetail[0].status === 1;
      });
      this.dataComplete = this.dataInvoiceAll.filter(it => {
        return it.invoiceDetail.length === 2 && it.invoiceDetail[1].status === 2;
      });
      this.dataCancel = this.dataInvoiceAll.filter(it => {
        return it.invoiceDetail.some(item => item.status === 4);
      });
      this.dataComplete1 = this.dataInvoiceAll.filter(it => {
        return it.invoiceDetail.length === 3 && it.invoiceDetail[2].status === 3;
      });
      this.visibleModal = false;
    },
    handleCancel() {
      this.visibleModal = false;
    },
    changeTab(key) {
      this.keyTab = key;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '~/assets/style/page/cart';

  .card-container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
  }

  .cart-content {
    grid-template-columns: 20% 13% 12% 20% 20% 15% !important;
    text-align: center;

    &:hover {
      background: #f3f3f1;
    }

    &-all {
      grid-template-columns: 25% 15% 15% 25% 20% !important;
      text-align: center;
      &:hover {
        background: #f3f3f1;
      }
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

  ::v-deep.status-select {
    .ant-select-selection--single {
      background-color: #d7d9ff;
    }
  }

  .order-status {
    &__title {
      display: grid;
      grid-template-columns: 20% 13% 12% 20% 20% 15%;
      text-align: center;
      border-bottom: 1px solid #a7a7aa;
      height: 35px;

      &-all {
        display: grid;
        grid-template-columns: 25% 15% 15% 25% 20%;
        text-align: center;
        border-bottom: 1px solid #a7a7aa;
        height: 35px;
      }
    }
  }

  .ant-btn-primary {
    width: 160px;
  }
</style>
