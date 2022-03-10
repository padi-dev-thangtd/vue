<template>
  <div>
    <div class="bg-white mt-5 p-4">
      <div class="mb-3">
        <p class="font-20px font-weight-bold">ĐỊA CHỈ GIAO HÀNG</p>
        <hr />
      </div>
      <div>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="Họ tên người nhận" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>

          <a-form-model-item ref="phone" label="Số điện thoại" prop="phone">
            <a-input v-model="form.phone" />
          </a-form-model-item>

          <a-form-model-item
            ref="address"
            label="Địa chỉ nhận hàng"
            prop="address"
          >
            <a-input v-model="form.address" />
          </a-form-model-item>

          <a-form-model-item ref="email" label="Email" prop="email">
            <a-input v-model="form.email" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>

    <div class="bg-white mt-4 p-4">
      <p class="font-20px font-weight-bold">KIỂM TRA LẠI ĐƠN HÀNG</p>
      <hr />
      <div class="cart-container">
        <div
          v-for="cart in dataCart"
          :key="cart._id"
          class="d-flex align-items-center cart-container__content"
        >
          <div class="ml-3 cart-icon" @click="handleDeleteCart(cart._id)"></div>
          <div
            class="cart-content w-100"
            @click="$router.push(`/books/${cart.productId}`)"
          >
            <img
              :src="cart.image"
              alt=""
              width="150"
              height="150"
              loading="lazy"
              class="cursor-pointer"
            />
            <div class="cart-content__info">
              <p class="font-16px mb-2 cursor-pointer">{{ cart.name }}</p>
              <p class="font-16px font-weight-bold">
                {{ cart.price | numberWithCommas }}
              </p>
            </div>
            <div class="cart-content__payment">
              <p class="font-16px">Số Lượng</p>
              <p class="text-center font-16px font-weight-bold">
                {{ cart.remain }}
              </p>
            </div>
            <div class="cart-content__payment">
              <p class="font-16px">Thành Tiền</p>
              <p class="txt-origin text-center font-16px font-weight-bold">
                {{ (cart.remain * cart.price) | numberWithCommas }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- read -->
    <div v-if="$route.hash !== '#info'">
      <div class="bg-white mt-4 p-4">
        <p class="font-20px font-weight-bold">PHƯƠNG THỨC THANH TOÁN</p>
        <hr />
        <p>Quỹ khách vui lòng điền tên và địa chỉ giao dịch nhận trước</p>
      </div>

      <div class="bg-white mt-4 p-4">
        <p class="font-20px font-weight-bold">PHƯƠNG THỨC VẬN CHUYỂN</p>
        <hr />
        <p>Thanh toán bằng tiền mặt trước khi nhận hàng</p>
      </div>

      <div class="bg-white mt-4 p-4">
        <p class="font-20px font-weight-bold">MÃ KHUYỄN MÃI / MÃ QUÀ TẶNG</p>
        <hr />
        <div class="d-flex align-items-center">
          <p class="mr-4">Sử dụng Voucher:</p>
          <div v-if="!useVoucher">
            <b-button variant="outline-warning btn-gift" v-b-modal.modal-1
              >Chọn Voucher</b-button
            >
            <b-modal ref="my-modal" id="modal-1" title="Lựa chọn Voucher">
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
            </b-modal>
          </div>
          <div v-else class="d-flex align-items-center">
            <BaseVoucher
              :bgRed="useVoucher.logo == 'red' ? true : false"
              :bgBlue="useVoucher.logo == 'blue' ? true : false"
              :bgGreen="useVoucher.logo == 'green' ? true : false"
              :nameVoucher="useVoucher.nameVoucher"
              :title="`Áp dụng cho đơn hàng trên ${useVoucher.apply}đ`"
              :expiryDate="useVoucher.baseDate"
              :coin="useVoucher.coin"
              :showButton="false"
            />
            <b-button
              variant="outline-warning btn-gift"
              v-b-modal.modal-1
              class="change-btn-voucher ml-4"
              >Thay đổi Voucher</b-button
            >
            <b-button
              variant="outline-danger btn-gift"
              class="ml-4"
              @click="handleCancelVoucher"
              >Hủy bỏ</b-button
            >
            <b-modal ref="my-modal" id="modal-1" title="Lựa chọn Voucher">
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
            </b-modal>
          </div>
        </div>
      </div>

      <div class="bg-white mt-4 p-4">
        <p class="font-20px font-weight-bold">THÔNG TIN KHÁC</p>
        <hr />
        <div>
          <p class="mb-2">Ghi chú:</p>
          <a-input
            v-model="contentInvoice"
            type="textarea"
            placeholder="Nội dung của sản phẩm"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </div>
      </div>
    </div>
    <!-- end read  -->
    <div class="bg-white mt-4 p-4">
      <p class="font-20px font-weight-bold">THANH TOÁN</p>
      <hr />
      <div>
        <div class="payment flex-end">
          <p class="mr-5 mb-2 font-18px">Thành tiền</p>
          <p class="font-18px">{{ totalMoneyBook | numberWithCommas }} đ</p>
        </div>
        <div class="payment flex-end">
          <p class="mr-5 mb-2 font-18px">Voucher giảm giá</p>
          <p class="font-18px">- {{ totalCoupon | numberWithCommas }}đ</p>
        </div>
        <div class="payment flex-end">
          <p class="mr-5 mb-4 font-18px">Phí vận chuyển</p>
          <p class="font-18px">{{ totalFreeship | numberWithCommas }}đ</p>
        </div>
        <div class="payment flex-end">
          <p class="mr-4 font-22px font-weight-bold">Tổng Số Tiền (gồm VAT)</p>
          <p class="font-22px txt-origin">
            {{ totalMoney | numberWithCommas }} đ
          </p>
        </div>
        <div class="d-flex flex-space-between mt-3">
          <b-button
            pill
            variant="outline-secondary"
            @click="
              $route.hash === '#info'
                ? $router.go(-1)
                : $router.push('/checkout/cart/')
            "
            >Quay lại
          </b-button>
          <b-button
            v-if="$route.hash !== '#info'"
            variant="danger"
            @click="hanhdlePayment"
            >XÁC NHẬN THANH TOÁN</b-button
          >
        </div>
      </div>
    </div>
    <a-modal
      title="Thông Báo"
      :visible="visibleModal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>Bạn chắc chắn muốn mua sản phẩm này không ?</p>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
export default {
  middleware: "notAuthenticated",
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        phone: "",
        address: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "Please input Name", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "Please input Phone", trigger: "blur" }
        ],
        address: [
          { required: true, message: "Please input Address", trigger: "blur" }
        ],
        email: [
          { required: true, message: "Please input Email", trigger: "blur" }
        ]
      },
      contentInvoice: "",
      dataUser: null,
      dataCart: null,
      totalMoneyBook: 0,
      totalMoney: 0,
      totalCoupon: 0,
      totalFreeship: 30000,
      dataVoucherUser: null,
      useVoucher: null,
      visibleModal: false,
      path: null,
      dataDetail: null
    };
  },

  computed: {
    ...mapState({
      listVoucher: state => state.vouchers.listVoucher
    })
  },

  created() {
    this.path = this.$route.path;
  },

  async mounted() {
    let dataLogin = process.browser
      ? JSON.parse(localStorage.getItem("data_login"))
      : "";
    const userIdOrder = this.$route.query.userId;
    const invoiceId = this.$route.query.invoiceId;
    const dataInvoiceId = await this.getInvoiceId({
      userId: userIdOrder,
      invoiceId: invoiceId
    });

    this.dataUser = await this.$store.dispatch(
      "users/getUserInfo",
      dataLogin.token
    );

    const response = await this.$store.dispatch(
      "users/getCartApi",
      dataLogin.token
    );
    this.dataCart = response.cart;
    console.log(this.dataCart, dataInvoiceId);
    const userOrder = response.user;
    if (userOrder) {
      this.form = {
        name: userOrder.name,
        phone: userOrder.phone ? `0${userOrder.phone}` : "",
        address: userOrder.address,
        email: userOrder.email,
        permission: userOrder.permission
      };
    }

    if (this.dataCart.length == 1) {
      this.totalMoneyBook = this.dataCart[0].price * this.dataCart[0].remain;
    } else if (this.dataCart.length > 1) {
      let total = 0;
      this.dataCart.forEach(it => {
        total = total + it.price * it.remain;
      });
      this.totalMoneyBook = total;
    } else {
      this.totalMoneyBook = 0;
    }

    this.useVoucher = JSON.parse(localStorage.getItem("data_voucher"));
    if (this.useVoucher) {
      // this.totalCoupon
      if (this.useVoucher.nameVoucher.toLowerCase().includes("coupon")) {
        this.totalCoupon = _.replace(
          _.split(this.useVoucher.nameVoucher, " ")[1],
          "k",
          "000"
        );
        this.totalFreeship = 30000;
      } else {
        this.totalFreeship = 0;
        this.totalCoupon = 0;
      }
    }

    this.totalMoney =
      this.totalMoneyBook + this.totalFreeship - this.totalCoupon;

    let token = process.browser
      ? JSON.parse(localStorage.getItem("data_login")).token
      : "";
    let userInfo = await this.$store.dispatch("users/getUserInfo", token);
    await this.$store.dispatch("vouchers/getListVoucher");

    // let voucherCheck = userInfo.voucher.reduce((arr, it) => {
    //   return [...arr, this.listVoucher.find(item => item._id == it)];
    // }, []);
    // this.dataVoucherUser = voucherCheck.filter(it => {
    //   return moment().isBefore(it.baseDate) && it.apply <= this.totalMoneyBook;
    // });
    const usedVoucher = userInfo?.usedVoucher;
    this.dataVoucherUser = this.listVoucher.filter(it => {
      return (
        it.quantity>0 &&moment().isBefore(it.baseDate) &&
        it.apply <= this.totalMoneyBook &&
        !usedVoucher.includes(it?._id)
      );
    });
  },

  methods: {
    ...mapActions({
      addInvoice: "users/addInvoice",
      getUserInfo: "users/getUserInfo",
      updateUser: "users/updateUser",
      deleteAllCart: "users/deleteAllCart",
      getInvoiceId: "users/getInvoiceId",
      decreaseVoucher : "users/decreaseVoucher"
    }),

    hanhdlePayment() {
      this.visibleModal = true;
    },
    handleUseVoucher(voucher) {
      this.useVoucher = voucher;
      this.$refs["my-modal"].hide();
      // if (voucher.nameVoucher.toLowerCase().includes("coupon")) {
      //   this.totalCoupon = _.replace(
      //     _.split(voucher.nameVoucher, " ")[1],
      //     "k",
      //     "000"
      //   );
      //   this.totalFreeship = 30000;
      // } else {
      //   this.totalFreeship = 0;
      //   this.totalCoupon = 0;
      // }
      this.totalFreeship = 30000;
      this.totalCoupon = voucher.coin;
      this.totalMoney =
        this.totalMoneyBook + this.totalFreeship - this.totalCoupon;
    },
    handleCancelVoucher() {
      localStorage.removeItem("data_voucher");
      this.useVoucher = null;
      this.totalCoupon = 0;
      this.totalFreeship = 30000;
      this.totalMoney =
        this.totalMoneyBook + this.totalFreeship - this.totalCoupon;
    },
    async handleOk() {
      localStorage.removeItem("data_voucher");
      let dataLogin = JSON.parse(localStorage.getItem("data_login"));

      // delete All Cart
      const userId = dataLogin?.token;
      await this.deleteAllCart({ userId });
      if (this.useVoucher) {
        let userInfo = await this.getUserInfo(dataLogin.token);
        userInfo.usedVoucher.push(this.useVoucher._id);
        await this.updateUser(userInfo);
        await this.decreaseVoucher({ voucherId: this.useVoucher._id });
      }
      let dataPayment = {
        userId: dataLogin.token,
        data: {
          baseDate: moment().format("YYYY/MM/DD"),
          money: this.totalMoney,
          content: this.contentInvoice,
          invoiceDetail: []
        }
      };
      await this.addInvoice(dataPayment);
      this.visibleModal = false;
      this.$router.push("/user/invoice/");
    },
    handleCancel() {
      this.visibleModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/style/page/cart";

.cart-payment div:last-child {
  border: none;
}

.payment {
  display: flex;
}

.btn-danger {
  padding: 10px 25px;
  border-radius: 30px;
}

.change-btn-voucher {
  height: 38px;
}
</style>
