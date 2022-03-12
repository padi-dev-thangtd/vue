<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer"
        >Vouchers</a-breadcrumb-item
      >
    </a-breadcrumb>
    <div class="text-right mb-4 mr-3">
      <b-button
        variant="outline-success"
        @click="$router.push('/admin/vouchers/add/')"
        >Add voucher</b-button
      >
    </div>
    <a-table
      :columns="columns"
      :data-source="listVoucher"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      class="table-action"
    >
      <span slot="image" slot-scope="text">
        <img :src="text" alt="" width="70px" height="100px" loading="lazy" />
      </span>
      <span
        slot="nameVoucher"
        class="font-14px font-weight-bold"
        slot-scope="text"
        >{{ text }}</span
      >
      <span slot="baseDate" class="font-14px" slot-scope="text">{{
        text
      }}</span>
      <span slot="apply" class="font-14px" slot-scope="text"
        >{{ text | numberWithCommas }}đ</span
      >
      <span slot="coin" class="font-14px" slot-scope="text">{{ text }} xu</span>
      <span slot="logo" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="content" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="sale" class="font-14px" slot-scope="text">{{ text }}%</span>
      <span slot="type" class="font-14px" slot-scope="text">{{ text }}</span>
      <div slot="action" slot-scope="action" class="txt-right pr-3">
        <nuxt-link :to="`/admin/vouchers/${action._id}/edit`"
          ><u> Edit</u></nuxt-link
        >
        <a class="ml-4 txt-red" @click="handleDelete(action._id)"
          ><u>Delete</u></a
        >
        <a-modal
          title="Thông Báo"
          :visible="visibleModal"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <p>Bạn chắc chắn muốn xóa voucher này không ?</p>
        </a-modal>
      </div>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: "admin",
  data() {
    const columns = [
      {
        title: "Tên voucher",
        dataIndex: "nameVoucher",
        key: "nameVoucher",
        scopedSlots: { customRender: "nameVoucher" },
        width: "20%"
      },
      {
        title: "Ngày hết hạn",
        dataIndex: "baseDate",
        key: "baseDate",
        scopedSlots: { customRender: "baseDate" },
        width: "12%"
      },
      {
        title: "Áp dụng cho hoá đơn",
        dataIndex: "apply",
        key: "apply",
        scopedSlots: { customRender: "apply" },
        width: "12%"
      },
      {
        title: "Giá",
        dataIndex: "coin",
        key: "coin",
        scopedSlots: { customRender: "coin" },
        width: "15%"
      },
      {
        title: "Số lần sử dụng còn lại",
        dataIndex: "quantity",
        key: "quantity",
        scopedSlots: { customRender: "quantity" },
        width: "12%"
      },
      {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        scopedSlots: { customRender: "logo" },
        width: "12%"
      },
      {
        title: "",
        key: "action",
        scopedSlots: { customRender: "action" },
        width: "20%"
      }
    ];
    return {
      columns,
      pagination: {},
      loading: false,
      visibleModal: false,
      voucherIdRemove: null
    };
  },

  computed: {
    ...mapState({
      listVoucher: state => state.vouchers.listVoucher
    })
  },

  async created() {
    await this.$store.dispatch("vouchers/getListVoucher");
  },

  methods: {
    ...mapActions({
      deleteVoucher: "vouchers/deleteVoucher"
    }),

    handleTableChange(pagination) {
      console.log(pagination);
    },

    handleDelete(voucherId) {
      this.visibleModal = true;
      this.voucherIdRemove = voucherId;
    },

    async handleOk() {
      this.visibleModal = false;
      await this.deleteVoucher(this.voucherIdRemove);
      await this.$store.dispatch("vouchers/getListVoucher");
    },

    handleCancel() {
      this.visibleModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep.ant-table-row-level-0 td {
  padding: 0;
}
</style>
