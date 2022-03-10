<template>
  <div>
    <div class="mt-4">
      <div class="product-view bg-white">
        <div class="product-view__image">
          <div class="product-view__image-img">
            <img
              :src="productInfo ? productInfo.image : ''"
              alt=""
              width="100%"
              loading="lazy"
            />
          </div>

          <div
            v-if="dataUser ? !(dataUser.permission === 'admin') : true"
            class="product-view__image-btn mt-3"
          >
            <b-button
              pill
              variant="outline-primary"
              class="add-cart mr-3"
              @click="handleAddCart"
            >
              Thêm vào giỏ hàng
            </b-button>
            <b-button pill variant="info" class="buy" @click="handleAddCart"
              >Mua ngay</b-button
            >
            <a-modal
              title="Thông Báo"
              :visible="visibleModal"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <p>Mời quý khách đăng nhập để có thể lựa chọn sản phẩm !</p>
            </a-modal>
          </div>
        </div>
        <div class="product-view__detail">
          <div class="product-view__detail-name mb-3">
            Cân Bằng Cảm Xúc, Cả Lúc Bão Giông
          </div>
          <div class="product-view__detail-page mb-2">
            <p>Xuất xứ: <span class="font-weight-bold">Việt Nam</span></p>
            <p>
              Tác giả:
              <span class="font-weight-bold">{{
                productInfo ? productInfo.auth : ""
              }}</span>
            </p>
          </div>
          <div class="product-view__detail-page mb-2">
            <p>Hình thức: <span class="font-weight-bold">Bìa Mềm</span></p>
          </div>
          <div class="product-view__detail-rate mb-3">
            <b-form-rating
              variant="warning"
              inline
              :value="productInfo ? productInfo.rate : ''"
              disabled
            ></b-form-rating>
            <span class="evaluate">( 24 đánh giá )</span>
          </div>
          <div class="product-view__detail-price mb-3">
            <span class="real-price"
              >{{
                (productInfo ? productInfo.price : "") | numberWithCommas
              }}đ</span
            >
            <span class="reduced-price">{{
              productInfo
                ? Math.round(
                    productInfo.price /
                      ((100 - parseInt(productInfo.sale)) / 100)
                  )
                : ""
            }}</span>
            <span class="sale">-{{ productInfo ? productInfo.sale : "" }}</span>
          </div>
          <div class="product-view__detail-time mb-3">
            <span class="mr-5">Thời gian giao trả </span>
            <span class="mr-1">Địa điểm giao hàng: </span>
            <span class="change cursor-pointer">Thay đổi</span>
          </div>
          <div
            v-if="dataUser ? !(dataUser.permission === 'admin') : true"
            class="product-view__detail-quantity"
          >
            <span class="mr-4 font-16px font-weight-bold">Số lượng: </span>
            <div class="caculator-quantity">
              <span class="minus mr-3" @click="handleMinus">-</span>
              <span class="number mr-3">{{ quantity }}</span>
              <span class="plus" @click="handlePlus">+</span>
            </div>
          </div>
          <hr />
          <div class="mb-1 cursor-pointer">
            <b-icon
              icon="star-fill"
              animation="fade"
              font-scale="1"
              class="txt-purple"
            ></b-icon>
            <span class="txt-blue font-weight-bold ml-2"
              >Nhập mã "QRFHS2": Giảm ngay 10K, đơn hàng từ 50K, thanh toán qua
              VNPAY</span
            >
          </div>
          <div class="mb-1 cursor-pointer">
            <b-icon
              icon="star-fill"
              animation="fade"
              font-scale="1"
              class="txt-purple"
            ></b-icon>
            <span class="txt-blue font-weight-bold ml-2"
              >Hoàn 30%, tối đa 50K, thanh toán qua ví Moca</span
            >
          </div>
          <div class="mb-1 cursor-pointer">
            <b-icon
              icon="star-fill"
              animation="fade"
              font-scale="1"
              class="txt-purple"
            ></b-icon>
            <span class="txt-blue font-weight-bold ml-2"
              >Nhập mã "AIRPAY021", Giảm ngay 10%, đơn hàng từ 0đ, thanh toán
              qua ví AirPay</span
            >
          </div>
          <div class="mb-1 cursor-pointer">
            <b-icon
              icon="star-fill"
              animation="fade"
              font-scale="1"
              class="txt-purple"
            ></b-icon>
            <span class="txt-blue font-weight-bold ml-2"
              >Giảm ngay 20K, đơn hàng từ 40K, thanh toán qua Ví ZaloPay</span
            >
          </div>
        </div>
      </div>
      <div class="product-tabs mt-4">
        <div>
          <b-card no-body>
            <b-tabs pills card>
              <b-tab title="Thông tin sản phẩm" active
                ><b-card-text>
                  <div class="product-tabs__rows">
                    <p>Mã hàng</p>
                    <p>{{ productInfo ? productInfo._id : "" }}</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Thương hiệu</p>
                    <p>Á Châu</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Tác giả</p>
                    <p>{{ productInfo ? productInfo.auth : "" }}</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Loại bìa</p>
                    <p>Bìa cứng</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Kích thước</p>
                    <p>25 x 30</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Số trang</p>
                    <p>{{ productInfo ? productInfo.pageNumber : "" }}</p>
                  </div>
                  <div class="product-tabs__rows">
                    <p>Sản phẩm bán chạy nhất</p>
                    <p class="txt-origin">
                      Top 100 sản phẩm bán chạy của tháng
                    </p>
                  </div>
                  <hr />
                  <div class="product-tabs__content">
                    <p class="product-tabs__content-title mb-2">
                      MÔ TẢ SẢN PHẨM
                    </p>
                    <p class="product-tabs__content-text">
                      {{ productInfo ? productInfo.content : "" }}
                    </p>
                  </div>
                </b-card-text></b-tab
              >
              <b-tab title="Khách hàng nhận xét">
                <b-card-text>
                  <div class="product-tabs__evaluate">
                    <div class="product-tabs__evaluate-point">
                      <p class="comment ml-1">4.8/5</p>
                      <b-form-rating
                        variant="warning"
                        inline
                        value="4.8"
                        disabled
                      ></b-form-rating>
                      <p class="ml-1 pt-2">97 review</p>
                    </div>
                    <div class="product-tabs__evaluate-progress">
                      <div class="evaluate-rate">
                        <p>5 sao</p>
                        <b-progress
                          height="6px"
                          value="70"
                          variant="warning"
                          key="1"
                        ></b-progress>
                        <p class="pl-3">70%</p>
                      </div>
                      <div class="evaluate-rate">
                        <p>4 sao</p>
                        <b-progress
                          height="6px"
                          value="50"
                          variant="warning"
                          key="1"
                        ></b-progress>
                        <p class="pl-3">50%</p>
                      </div>
                      <div class="evaluate-rate">
                        <p>3 sao</p>
                        <b-progress
                          height="6px"
                          value="30"
                          variant="warning"
                          key="1"
                        ></b-progress>
                        <p class="pl-3">30%</p>
                      </div>
                      <div class="evaluate-rate">
                        <p>2 sao</p>
                        <b-progress
                          height="6px"
                          value="0"
                          variant="warning"
                          key="1"
                        ></b-progress>
                        <p class="pl-3">0%</p>
                      </div>
                      <div class="evaluate-rate">
                        <p>1 sao</p>
                        <b-progress
                          height="6px"
                          value="0"
                          variant="warning"
                          key="1"
                        ></b-progress>
                        <p class="pl-3">0%</p>
                      </div>
                    </div>
                  </div>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconStarFill } from "bootstrap-vue";
import { mapActions } from "vuex";
export default {
  components: {
    BIcon,
    BIconStarFill
  },

  data() {
    return {
      quantity: 1,
      productInfo: null,
      visibleModal: false,
      dataUser: null
    };
  },

  async created() {
    let dataLogin = process.browser
      ? JSON.parse(localStorage.getItem("data_login"))
      : "";
    this.dataUser = await this.$store.dispatch(
      "users/getUserInfo",
      dataLogin ? dataLogin.token : ""
    );
    this.productInfo = await this.$store.dispatch(
      "products/getProductId",
      this.$route.params.id
    );
  },

  methods: {
    ...mapActions({
      getCart: "users/getCart",
      addCart: "users/addCart",
      updateCart: "users/updateCart"
    }),

    handleMinus() {
      this.quantity > 1 ? this.quantity-- : "";
    },

    handlePlus() {
      this.quantity >= 1 ? this.quantity++ : "";
    },

    async handleAddCart() {
      let dataLogin = JSON.parse(localStorage.getItem("data_login"));
      if (dataLogin) {
        let getCart = await this.getCart(dataLogin.token);
        let checkCartExist = _.filter(getCart, {
          productId: this.$route.params.id
        });

        let dataCart = {
          userId: dataLogin.token,
          cartId: _.isEmpty(checkCartExist) ? "" : checkCartExist[0]._id,
          data: {
            productId: this.$route.params.id,
            name: this.productInfo.name,
            image: this.productInfo.image,
            price: this.productInfo.price,
            quanlity: this.productInfo.quanlity,
            remain: this.quantity
          }
        };

        if (!_.isEmpty(checkCartExist)) {
          let resApi = await this.updateCart(dataCart);
          if (resApi) {
            this.$router.push("/checkout/cart/");
          }
        } else {
          let resApi = await this.addCart(dataCart);
          if (resApi) {
            this.$store.commit("users/setCartNumber", getCart.length + 1);
            this.$router.push("/checkout/cart/");
          }
        }
      } else {
        this.visibleModal = true;
      }
    },
    handleOk() {
      return;
    },
    handleCancel() {
      this.visibleModal = false;
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/page/index";
</style>
