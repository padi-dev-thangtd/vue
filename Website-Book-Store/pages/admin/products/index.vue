<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer">Products</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="text-right mb-4 mr-3">
      <b-button variant="outline-success" @click="$router.push('/admin/products/add/')">Add product</b-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="listProducts"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      class="table-action"
    >
      <span slot="image" slot-scope="text" >
        <img :src="text" alt="" width="70px" height="100px" loading="lazy">
      </span>
      <span slot="name" class="font-14px font-weight-bold" slot-scope="text" >{{ text }}</span>
      <span slot="auth" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="price" class="font-14px" slot-scope="text">{{ text | numberWithCommas }}đ</span>
      <span slot="quanlity" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="pageNumber" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="content" class="font-14px" slot-scope="text">{{ text }}</span>
      <span slot="sale" class="font-14px" slot-scope="text">{{ text }}%</span>
      <span slot="type" class="font-14px" slot-scope="text">{{ text }}</span>
      <div slot="action" slot-scope="action" class="txt-right pr-3">
        <nuxt-link :to='`/admin/products/${action._id}/edit`'><u> Edit</u></nuxt-link>
        <a class="ml-4 txt-red" @click="handleDelete(action._id)"><u>Delete</u></a>
        <a-modal
          title="Thông Báo"
          :visible="visibleModal"
          @ok="handleOk()"
          @cancel="handleCancel"
        >
          <p>Bạn chắc chắn muốn xóa sản phẩm này không ?</p>
        </a-modal>
      </div>
    </a-table>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'admin',
  data() {
    const columns = [
      {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        scopedSlots: { customRender: 'image' },
        width: '10%'
      },
      {
        title: 'Tên sách',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
        width: '15%'
      },
      {
        title: 'Tác giả',
        dataIndex: 'auth',
        key: 'auth',
        scopedSlots: { customRender: 'auth' },
        width: '10%'
      },
      {
        title: 'Giá' ,
        dataIndex: 'price',
        key: 'price',
        scopedSlots: { customRender: 'price' },
        width: '7%'
      },
      {
        title: 'Số lượng' ,
        dataIndex: 'quanlity',
        key: 'quanlity',
        scopedSlots: { customRender: 'quanlity' },
        width: '7%'
      },
      {
        title: 'Số trang' ,
        dataIndex: 'pageNumber',
        key: 'pageNumber',
        scopedSlots: { customRender: 'pageNumber' },
        width: '7%'
      },
      {
        title: 'Nội dung' ,
        dataIndex: 'content',
        key: 'content',
        scopedSlots: { customRender: 'content' },
        ellipsis: true,
        width: '15%'
      },
      {
        title: 'Giảm giá' ,
        dataIndex: 'sale',
        key: 'sale',
        scopedSlots: { customRender: 'sale' },
        width: '7%'
      },
      {
        title: 'Thể loại' ,
        dataIndex: 'type',
        key: 'type',
        scopedSlots: { customRender: 'type' },
        width: '7%'
      },
      {
        title: '',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: '15%',
      },
    ]
    return {
      columns,
      pagination: {},
      loading: false,
      visibleModal: false,
      productIdRemove: null,
    }
  },

  computed: {
    ...mapState({
      listProducts: state => state.products.listProducts,
    })
  },

  async created() {
    await this.$store.dispatch('products/getListProduct');
  },

  methods: {
    ...mapActions({
      deleteProduct: 'products/deleteProduct',
    }),

    handleTableChange(pagination) {
      console.log(pagination);
    },

    handleDelete(productId) {
      this.visibleModal = true;
      this.productIdRemove = productId;
    },

    async handleOk() {
      this.visibleModal = false;
      await this.deleteProduct(this.productIdRemove);
      await this.$store.dispatch('products/getListProduct');
    },

    handleCancel() {
      this.visibleModal = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep.ant-table-row-level-0 td {
    padding: 0;
  }
</style>
