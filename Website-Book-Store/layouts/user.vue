<template>
  <default-layout>
    <a-layout id="components-layout-demo-side" class="mt-4">
      <a-layout-sider v-model="collapsed" collapsible :trigger="null" class="menu" collapsed-width="0">
        <div class="d-flex ml-4 mb-3 align-items-center">
          <a-icon type="team" class="font-28px mr-2" />
          <div>
            <p class="font-12px">Tài khoản của</p>
            <p class="font-16px font-weight-bold">{{ nameUser }}</p>
          </div>
        </div>
        <a-menu theme="dark" :inlineCollapsed="false" :selectable="false" mode="inline">
          <a-sub-menu
            key="1"
            :class="setMenuActive(URL_MENU.PROFILE, path) ? 'ant-menu-item-selected' : ''"
          >
            <nuxt-link
              slot="title"
              to="/user/profile"
              class="txt-black-4 font-14px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="profile" class="txt-blue" />
                <span>Thông Tin Tài Khoản</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="2"
            :class="setMenuActive(URL_MENU.INVOICE, path) ? 'ant-menu-item-selected' : ''"
          >
            <nuxt-link
              slot="title"
              to="/user/invoice"
              class="txt-black-4 font-14px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="book" class="txt-green" />
                <span>Quản Lý Đơn Hàng</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="3"
            :class="setMenuActive(URL_MENU.NOTICE, path) ? 'ant-menu-item-selected' : ''"
          >
            <nuxt-link
              slot="title"
              to="/user/notice/"
              class="txt-black-4 font-14px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <b-icon icon="bell-fill" class="border rounded font-16px border-0 mr-2 txt-red"></b-icon>
                <span>Thông Báo</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="4"
            :class="setMenuActive(URL_MENU.VOUCHER, path) ? 'ant-menu-item-selected' : ''"
          >
            <nuxt-link
              slot="title"
              to="/user/voucher/"
              class="txt-black-4 font-14px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="account-book" class="txt-purple" />
                <span>Voucher</span>
              </div>
            </nuxt-link>
          </a-sub-menu>

          <a-sub-menu
            key="5"
            :class="setMenuActive(URL_MENU.POINT, path) ? 'ant-menu-item-selected' : ''"
          >
            <nuxt-link
              slot="title"
              to="/user/point/"
              class="txt-black-4 font-14px"
            >
              <div class="d-flex align-items-center sub-menu-item-height">
                <a-icon type="dollar" class="text-warning"/>
                <span>Xu Tích Luỹ</span>
              </div>
            </nuxt-link>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="container-fluid bg-white">
          <div class="h-100 py-4">
            <Nuxt />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </default-layout>
</template>

<script>
import DefaultLayout from '~/layouts/default.vue';
import { URL_MENU } from '~/plugins/constant.js';
import { BIcon, BIconBellFill } from 'bootstrap-vue';

export default {
  components: {
    DefaultLayout,
    BIcon,
    BIconBellFill,
  },
  data() {
    return {
      collapsed: false,
      URL_MENU,
      path: '',
      nameUser: '',
    };
  },

  watch: {
    $route(to){
      this.path = to.path;
    }
  },

  created() {
    this.path = this.$route.path;
    this.nameUser = JSON.parse(localStorage.getItem('data_login')).name;
  },
};
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

.menu {
  min-width: 210px !important;
}

.ant-layout-sider {
  background-color: #f4f4f4 !important;
  margin-right: 15px;

  ul {
    background-color: #f4f4f4 !important;
  }
}

.ant-menu-submenu-active {
  background-color: rgb(189, 192, 192) !important;
}
</style>
