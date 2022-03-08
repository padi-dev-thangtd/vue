<template>
  <div>
    <template v-if="isLoading">
      <div class="fade-loading h-100 w-100"></div>
      <div class="loading-box">
        <img src="../assets/images/Spinner-1s-200px (2).svg" alt="" />
      </div>
    </template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-model="collapsed" collapsible class="menu">
        <div @click="$router.push('/')" class="cursor-pointer">
          <img
            src="~/assets/images/NhaSachTienPhong.png"
            alt="logo nha sach tien phong"
            width="100%"
            loading="lazy"
          />
        </div>
        <a-menu
          theme="dark"
          :inlineCollapsed="false"
          :selectable="false"
          mode="inline"
        >
          <a-sub-menu
            key="1"
            :class="
              setMenuActive(URL_MENU.USERS, path)
                ? 'ant-menu-item-selected'
                : ''
            "
          >
            <nuxt-link
              slot="title"
              to="/admin/users"
              class="txt-white font-16px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="user" />
                <span>Users</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="2"
            :class="
              setMenuActive(URL_MENU.PRODUCTS, path)
                ? 'ant-menu-item-selected'
                : ''
            "
          >
            <nuxt-link
              slot="title"
              to="/admin/products"
              class="txt-white font-16px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="book" />
                <span>Products</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="3"
            :class="
              setMenuActive(URL_MENU.VOUCHER_ADMIN, path)
                ? 'ant-menu-item-selected'
                : ''
            "
          >
            <nuxt-link
              slot="title"
              to="/admin/vouchers"
              class="txt-white font-16px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="account-book" />
                <span>Vouchers</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="4"
            :class="
              setMenuActive(URL_MENU.ORDER_STATUS, path)
                ? 'ant-menu-item-selected'
                : ''
            "
          >
            <nuxt-link
              slot="title"
              to="/admin/orderStatus"
              class="txt-white font-16px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="account-book" />
                <span>orders Status</span>
              </div>
            </nuxt-link>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="container-fluid">
          <div class="h-100 py-4">
            <Nuxt />
          </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          Website quản lý nhà sách Tiền Phong
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import { URL_MENU } from "~/plugins/constant.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      collapsed: false,
      URL_MENU,
      path: ""
    };
  },
  async middleware({ store, redirect }) {
    const dataLogin = process.browser
      ? JSON.parse(localStorage.getItem("data_login"))
      : "";
    const dataUser = await store.dispatch(
      "users/getUserInfo",
      dataLogin?.token
    );
    if (!(dataUser.permission === "admin")) {
      return redirect("/");
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  },

  watch: {
    $route(to) {
      this.path = to.path;
    }
  },

  created() {
    this.path = this.$route.path;
    let subKey = this.path.split("/")[1];
  }
};
</script>

<style lang="scss" scoped>
.fade-loading {
  position: absolute;
  top: 0;
  z-index: 1035;
  width: 100%;
  height: 100%;
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
