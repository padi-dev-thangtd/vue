<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px cursor-pointer">
        <span @click="$router.push('/admin/users')">Users</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer">Add user</a-breadcrumb-item>
    </a-breadcrumb>
    <div>
      <div class="font-24px text-center mb-3">Add user</div>
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- <a-form-model-item ref="userName" label="Tài khoản" prop="userName">
          <a-input v-model="ruleForm.userName" type="email" />
        </a-form-model-item>

        <a-form-model-item ref="password" label="Mật khẩu" prop="password">
          <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item label="Nhập lại mật khẩu" prop="checkPass">
          <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </a-form-model-item> -->

        <a-form-model-item ref="permission" label="Quyền" prop="permission">
          <a-select v-model="ruleForm.permission" placeholder="Quyền chủ sở hữu !">
            <a-select-option value="user">User</a-select-option>
            <a-select-option value="admin">Admin</a-select-option>
          </a-select>
        </a-form-model-item>

        <!-- <a-form-model-item ref="name" label="Họ tên" prop="name">
          <a-input v-model="ruleForm.name" />
        </a-form-model-item>

        <a-form-model-item ref="phone" label="Số điện thoại" prop="phone">
          <a-input v-model="ruleForm.phone" />
        </a-form-model-item>

        <a-form-model-item ref="address" label="Địa chỉ" prop="address">
          <a-input v-model="ruleForm.address" />
        </a-form-model-item>

        <a-form-model-item ref="email" label="Email" prop="email">
          <a-input v-model="ruleForm.email" />
        </a-form-model-item> -->

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit('ruleForm')">
            Create
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            Reset
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  layout: 'admin',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      other: '',
      ruleForm: {
        userName: '',
        checkPass: '',
        password: '',
        permission: 'user',
        name: '',
        phone: null,
        address: '',
        email: '',
      },
      rules: {
        userName: [
          { required: true, message: 'Please input User Name', trigger: 'blur' },
          { type: "email", message: ' The input is not valid E-mail!  ', trigger: 'blur' },
        ],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        phone: [
          { required: true, message: 'Please input Phone', trigger: 'blur' },
          { min: 10, max: 10, message: 'Please input 10 numbers', trigger: 'blur' }
        ],
        address: [{ required: true, message: 'Please input Address', trigger: 'blur' }],
        email: [
          { required: true, message: 'Please input Email', trigger: 'blur' },
          { type: "email", message: ' The input is not valid E-mail!  ', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      addUser: 'users/addUser',
    }),
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(async valid => {
        if (valid) {
          delete this.ruleForm.checkPass;
          await this.addUser(this.ruleForm);
          this.$router.push('/admin/users/');
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
