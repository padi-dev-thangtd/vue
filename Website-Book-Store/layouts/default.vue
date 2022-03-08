<template>
  <div>
    <template v-if="isLoading">
      <div class="fade-loading h-100 w-100"></div>
      <div class="loading-box">
        <img src="../assets/images/Spinner-1s-200px (2).svg" alt="">
      </div>
    </template>
    <historyViewProduct />
    <div>
      <header class="header d-flex">
        <div class="container d-flex">
          <div class="header-left d-flex h-100">
            <div class="header-left__logo d-flex align-items-center h-100">
              <img
                src="~/assets/images/NhaSachTienPhong.png" alt="logo tiki" width="119" height="70" loading="lazy"
                class="cursor-pointer"
                @click="$router.push('/')"
              >
            </div>
            <div class="header-left__search ml-1">
              <b-input-group class="mt-3">
                <b-form-input
                  v-model="dataForm.search"
                  placeholder="Tìm kiếm sản phẩm mong muốn ..."
                />
                <b-input-group-append>
                  <b-button variant="success" @click="handleSearch">
                    <img src="~/assets/images/search.svg" alt="logo tiki" width="20" height="20" loading="lazy">
                    Tìm kiếm
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
          <div class="header-right d-flex align-items-center ml-3">
            <div>
              <div v-if="!loggedIn" class="header-right__user d-flex mr-3" @click="handleShowFormLogin">
                <img src="~/assets/images/icon-user.svg" alt="icon-user" width="32" height="32" loading="lazy">
                <p class="txt-white pt-3 ml-1 font-12px regis"> Đăng nhập</p>
              </div>
              <a-tooltip placement="bottomLeft" v-else>
                <template slot="title">
                  <div class="d-flex mb-2 align-items-center" @click="$router.push('/user/profile/')">
                    <a-icon type="user" class="txt-blue" />
                    <p class="ml-2">Thông Tin Tài Khoản</p>
                  </div>
                  <div class="d-flex mb-2 align-items-center" @click="$router.push('/user/invoice/')">
                    <a-icon type="book" class="txt-green" />
                    <p class="ml-2">Đơn Hàng Của Tôi</p>
                  </div>
                  <div class="d-flex mb-2 align-items-center" @click="$router.push('/user/point/')">
                    <a-icon type="dollar" class="text-warning"/>
                    <p class="ml-2 align-items-center">Điểm Tích Luỹ</p>
                  </div>
                  <div class="d-flex mb-2 align-items-center" @click="$router.push('/user/voucher/')">
                    <a-icon type="account-book" class="txt-purple" />
                    <p class="ml-2">Voucher</p>
                  </div>
                  <div v-if="dataToken.permission == 'admin'">
                    <hr class="my-2"/>
                    <div class="d-flex align-items-center" @click="$router.push('/admin/users/')">
                      <a-icon type="usergroup-add" class="txt-black"/>
                      <p class="ml-2">Quản Lý Hệ Thống Admin</p>
                    </div>
                  </div>
                  <div v-if="dataToken.permission == 'admin'">
                    <hr class="my-2"/>
                    <div class="d-flex align-items-center" @click="$router.push('/checkout/orderStatus/')">
                      <a-icon type="dropbox" class="txt-black"/>
                      <p class="ml-2">Quản Lý Đơn Hàng</p>
                    </div>
                  </div>
                  <hr class="my-2"/>
                  <div class="d-flex align-items-center" @click="handleLogout">
                    <a-icon type="logout" class="txt-red" />
                    <p class="ml-2">Đăng xuất</p>
                  </div>
                </template>
                <div class="header-right__user d-flex mr-3">
                <img src="~/assets/images/icon-user.svg" alt="icon-user" width="32" height="32" loading="lazy">
                <div class="d-flex flex-column">
                  <p class="txt-white">Tài khoản</p>
                  <p class="txt-white ml-1 font-12px">{{ dataToken.name}}</p>
                </div>
              </div>
              </a-tooltip>
            </div>
            <div class="header-right__cart d-flex" @click="$router.push('/checkout/cart/')">
              <img src="~/assets/images/icon-cart.svg" alt="icon-user" width="32" height="32" loading="lazy">
              <div class="header-right__cart-noti">{{ cartNumber }}</div>
              <p  class="txt-white pt-3 ml-1 font-12px">Giỏ hàng</p>
            </div>
          </div>
        </div>
      </header>
    </div>
    <!-- Form Login -->
    <div v-if="isFormLogin">
      <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
      <div class="form-register">
        <div class="form-register__menu d-flex mb-3">
          <h3
            class="w-50 form-register__menu--register"
            :class="isShowLogin ? 'form-register__menu--register-bg' : ''"
            @click="handleClickLoginTab"
          >
            Đăng nhập
          </h3>
          <h3
            class="w-50 form-register__menu--register"
            :class="isShowRegister ? 'form-register__menu--register-bg' : ''"
            @click="handleClickResgiterTab"
          >
            Đăng ký
          </h3>
        </div>
        <div class="form-register__content">
          <p v-if="errorlogin" class="txt-red">Tài khoản hoặc mật khẩu không đúng !</p>
          <p v-if="errorEmail" class="txt-red">Email không đúng định dạng !</p>
          <p v-if="errorPassword" class="txt-red">Hai mật khẩu bạn nhập không khớp !</p>


          <div class="form-register__content--email">
            <p class="form-register__content--email-label">Email</p>
            <input v-model="formLogin.userName" type="text" class="form-register__content--email-input form-control" placeholder="Nhập email ...">
            <p></p>
          </div>
          <div class="form-register__content--email pt-2">
            <p class="form-register__content--email-label">Mật khẩu</p>
            <input v-model="formLogin.password" type="password" class="form-register__content--email-input form-control">
          </div>
          <div v-if="isShowRegister" class="form-register__content--email pt-2 pb-3">
            <p class="form-register__content--email-label">Nhập lại mật khẩu</p>
            <input v-model="formLogin.confirm" type="password" class="form-register__content--email-input form-control">
          </div>
          <div v-if="isShowLogin" class="py-2 text-right">
            <nuxt-link to="#" class="txt-origin">Quên mật khẩu ?</nuxt-link>
          </div>
          <div class="text-center">
            <button
              class="py-2 my-2 form-register__content--btn-login"
              :class="btnLogin ? 'disable-btn-login' : ''"
              @click="handleLogin" :disabled="btnLogin"
            >
              {{ isShowLogin ? 'Đăng nhập' : 'Đăng ký' }}
            </button>
          </div>
          <div class="text-center">
            <button
              class="py-2 my-2 form-register__content--btn-cancel"
              @click="isFormLogin = false"
            >
              Bỏ qua
            </button>
          </div>
          <div v-if="isShowLogin" class="text-center mt-4">
            <p class="font-12px">Bằng việc đăng nhập, bạn đã đồng ý với Fahasa.com về</p>
            <p class="font-12px"><a href="#" class="txt-origin">Điều khoản dịch vụ</a> & <a href="#" class="txt-origin">Chính sách bảo mật</a></p>
          </div>
        </div>
      </div>
    </div>

    <div class="container h-100">
      <Nuxt v-if="!$slots.default" />
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import historyViewProduct from '../components/historyViewProduct.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    historyViewProduct
  },

  data() {
    return {
      isFormLogin: false,
      isShowLogin: true,
      isShowRegister: false,
      dataForm: {
        search: ''
      },
      formLogin: {
        userName: '',
        password: '',
        confirm: ''
      },
      loggedIn: false,
      errorlogin: false,
      errorPassword: false,
      errorEmail: false,
      btnLogin: false,
      dataToken: null,
    }
  },

  computed: {
    ...mapState({
      listUser: state => state.users.listUser,
      isLoading: state => state.isLoading,
      cartNumber: state => state.users.cartNumber,
      listProducts: state => state.products.listProducts,
    })
  },

  watch: {
    'formLogin.userName': function(e) {
      if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)) {
        if (this.formLogin.password) {
          this.btnLogin = false;
        } else {
          this.btnLogin = true;
        }
        this.errorEmail = false;
      } else {
        this.errorEmail = true;
        this.btnLogin = true;
      }
    },
    'formLogin.password': function(e) {
      if (e && this.formLogin.userName && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formLogin.userName)) {
        this.btnLogin = false;
      }
      if (!e) {
        this.btnLogin = true;
      }
    },
    'formLogin.confirm': function(e) {
      if (this.formLogin.password === e) {
        if (this.formLogin.userName && /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formLogin.userName)) {
          this.btnLogin = false;
        } else {
          this.btnLogin = true;
        }
        this.errorPassword = false;
      } else {
        this.errorPassword = true;
        this.btnLogin = true;
      }
    }
  },

  async created() {
    let dataLogin = process.browser ? JSON.parse(localStorage.getItem('data_login')) : '';
    if (dataLogin) {
      this.loggedIn = true;
      this.dataToken = dataLogin;
      let dataCart = await this.$store.dispatch('users/getCart', dataLogin.token);
      this.$store.commit('users/setCartNumber', dataCart.length);
    }
  },

  methods: {
    ...mapActions({
      getListUser: 'users/getListUser',
      addUser: 'users/addUser',
      setListProductsSearch: 'products/setListProductsSearch',
    }),
    handleShowFormLogin() {
      if (this.formLogin.userName == '' && this.formLogin.password == '' && this.formLogin.confirm == '') {
        this.btnLogin = true;
      }
      this.isFormLogin = true;
    },
    handleClickLoginTab() {
      this.isShowLogin = true;
      this.isShowRegister = false;
      this.errorPassword = false;
    },
    handleClickResgiterTab() {
      this.isShowLogin = false;
      this.isShowRegister = true;
      this.errorlogin = false;
      this.errorEmail = false;
      this.btnLogin = true;
    },
    handleLogin() {

      // this.$store.commit('setLoading', true);

      setTimeout(async () => {
        if (this.isShowLogin) {
          delete this.formLogin.confirm;
          await this.getListUser();
          let checkLogin = _.find(this.listUser, this.formLogin);
          if (checkLogin) {
            let dataToken = {
              token: checkLogin._id,
              name: checkLogin.name,
              email: checkLogin.email,
              permission: checkLogin.permission,
            }
            localStorage.setItem('data_login', JSON.stringify(dataToken));

            if (checkLogin.permission == 'admin') {
              this.$router.push('/admin/users/');
              this.loggedIn = true;
              this.dataToken = dataToken;
            } else {
              this.dataToken = dataToken;
              this.errorlogin = false;
              this.loggedIn = true;
              this.isFormLogin = false;
            }
          } else {
            this.errorlogin = true;
          }
        } else {
          const data = {
            userName: this.formLogin.userName,
            password: this.formLogin.password,
            permission: 'user',
            name: this.formLogin.userName.split('@')[0],
            phone: '',
            address: '',
            email: this.formLogin.userName,
          }
          let aswer = await this.addUser(data);
          if (aswer) {
            this.$success({
              title: 'Đăng ký tài khoản thành công !',
              content: 'Xin mời bạn đăng nhập',
            });
            this.isShowLogin = true;
            this.isShowRegister = false;
            this.formLogin = {
              userName: '',
              password: '',
              confirm: '',
            };
            this.errorEmail = false;
          }
        }
        this.$store.commit('setLoading', false);
      }, 1500);
    },
    handleLogout() {
      this.$store.commit('setLoading', true);
      setTimeout(() => {
        localStorage.removeItem('data_login');
        localStorage.removeItem('history_view');
        this.loggedIn = false;
        this.$store.commit('users/setCartNumber', null);
        this.dataForm = {
          userName: '',
          password: '',
          confirm: ''
        }
        this.$store.commit('setLoading', false);
        this.$router.push('/');
      },1500)
    },
    handleSearch() {
      if (this.dataForm.search === '') {
        this.setListProductsSearch([]);
      } else {
        const dataSearch = this.listProducts.filter(it => {
          return it.name.includes(this.dataForm.search) || it.auth.includes(this.dataForm.search);
        });
        this.setListProductsSearch(dataSearch);
      }
    },
  }
}
</script>

<style lang="scss">
  @import '~/assets/style/layouts/index';
  .ant-tooltip {
    box-shadow: rgb(0 0 0 / 18%) 0px 6px 12px 0px;
    z-index: 15;
    min-width: 150px;
    padding: 0;
  }

  .ant-tooltip-arrow {
    left: 40px !important;
    top: -13px !important;
    &::before {
      background-color: white !important;
    }
  }

  .ant-tooltip-inner {
    background-color: white;
    color: black;
    padding: 15px;

    p:hover {
      color: cadetblue;
      cursor: pointer;
    }
  }

  .disable-btn-login {
    cursor: not-allowed;
    &:hover {
      background-color: burlywood;
    }
  }

  .fade-loading {
    position: absolute;
    top: 0;
    z-index: 1035;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.9;
  }
  .loading-box {
    position: fixed;
    top: 33%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1040;
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: none;
  }
</style>
