<template>
  <div>
    <!-- <div class="text-right mb-4 mr-3">
      <b-button variant="outline-success" @click="$router.push('/admin/users/add/')">Add user</b-button>
    </div> -->
    <a-table
      :columns="columns"
      :data-source="listUser"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      class="table-action"
    >
      <span slot="userName" class="font-16px font-weight-bold" slot-scope="text" >{{ text }}</span>
      <span slot="name" class="font-16px font-weight-bold" slot-scope="text" >{{ text }}</span>
      <span slot="phone" class="font-16px" slot-scope="text">0{{ text }}</span>
      <span slot="address" class="font-16px" slot-scope="text">{{ text }}</span>
      <span slot="email" class="font-16px" slot-scope="text">{{ text }}</span>
      <span slot="permission" class="font-16px" slot-scope="text">{{ text }}</span>
      <div slot="action" slot-scope="action" class="txt-right pr-3">
        <nuxt-link :to="`/admin/users/${action._id}/edit`"><u> Edit</u></nuxt-link>
        <a class="ml-4 txt-red" @click="handleDelete(action._id)"><u>Delete</u></a>
        <a-modal
          title="Thông Báo"
          :visible="visibleModal"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <p>Bạn chắc chắn muốn xóa user này không ?</p>
        </a-modal>
      </div>
    </a-table>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  layout: 'admin',
  data() {
    const columns = [
      {
        title: 'UserName',
        dataIndex: 'userName',
        key: 'userName',
        scopedSlots: { customRender: 'userName' },
        width: '18%'
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' },
        width: '10%'
      },
      {
        title: 'Số điện thoại' ,
        dataIndex: 'phone',
        key: 'phone',
        scopedSlots: { customRender: 'phone' },
        width: '12%'
      },
      {
        title: 'Địa chỉ' ,
        dataIndex: 'address',
        key: 'address',
        scopedSlots: { customRender: 'address' },
        width: '17%'
      },
      {
        title: 'Email' ,
        dataIndex: 'email',
        key: 'email',
        scopedSlots: { customRender: 'email' },
        width: '18%'
      },
      {
        title: 'Permission' ,
        dataIndex: 'permission',
        key: 'permission',
        scopedSlots: { customRender: 'permission' },
        width: '10%'
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
      userIdRemove: null,
    }
  },

  computed: {
    ...mapState({
      listUser: state => state.users.listUser,
    })
  },

  async created() {
    await this.$store.dispatch('users/getListUser');
  },

  methods: {
    ...mapActions({
      deleteUser: 'users/deleteUser',
    }),
    handleTableChange(pagination) {
      console.log(pagination);
    },

    async handleDelete(userId) {
      this.visibleModal = true;
      this.userIdRemove = userId;
    },

    async handleOk() {
      this.visibleModal = false;
      await this.deleteUser(this.userIdRemove);
      await this.$store.dispatch('users/getListUser');
    },

    handleCancel() {
      this.visibleModal = false;
    }
  }
}
</script>
