<template>
  <div>
    <div class="text-center mb-3">
      <p class="font-24px font-weight-bold">Thông Tin Tài Khoản</p>
    </div>
    <div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="userName" label="Tài khoản" prop="userName">
          <a-input v-model="form.userName" />
        </a-form-model-item>

        <a-form-model-item ref="name" label="Họ tên" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item ref="phone" label="Số điện thoại" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>

        <a-form-model-item ref="address" label="Địa chỉ" prop="address">
          <a-input v-model="form.address" />
        </a-form-model-item>

        <a-form-model-item ref="email" label="Email" prop="email">
          <a-input v-model="form.email" />
        </a-form-model-item>

        <a-row class="mb-4">
          <a-col :offset="4">
            <a-checkbox @change="onChangePassword">
              Thay đổi mật khẩu
            </a-checkbox>
          </a-col>
        </a-row>

        <div v-if="changePassWord">
          <a-form-model-item ref="passOld" label="Mật khẩu hiện tại" prop="passOld">
            <a-input v-model="form.passOld" type="password" autocomplete="off" />
            <div class="txt-red" v-if="checkPassOld">Mật khẩu hiện tại không đúng !</div>
          </a-form-model-item>
          <a-form-model-item ref="passNew" label="Mật khẩu" prop="passNew">
            <a-input v-model="form.passNew" type="password" autocomplete="off" />
          </a-form-model-item>
          <a-form-model-item label="Nhập lại mật khẩu" prop="checkPass">
            <a-input v-model="form.checkPass" type="password" autocomplete="off" />
          </a-form-model-item>
        </div>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            Cập nhập
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'user',
  middleware: 'notAuthenticated',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.passNew) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        userName: '',
        passOld: '',
        passNew: '',
        checkPass: '',
        name: '',
        phone: null,
        address: '',
        email: '',
      },
      rules: {
        userName: [{ required: true, message: 'Please input User Name', trigger: 'blur' }],
        passOld: [{ required: true, message: 'Please input the password', trigger: 'blur' }],
        passNew: [{ validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
        address: [{ required: true, message: 'Please input Address', trigger: 'blur' }],
        email: [{ required: true, message: 'Please input Email', trigger: 'blur' }],
      },
      changePassWord: false,
      checkPassOld: false,
    };
  },

  async created() {
    let token = process.browser ? JSON.parse(localStorage.getItem('data_login')).token : '';
    let dataUserInfo = await this.$store.dispatch('users/getUserInfo', token);
    this.form = {
      ...this.form,
      ...dataUserInfo,
      phone: dataUserInfo.phone ? `0${dataUserInfo.phone}` : '',
    };
  },

  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.checkPassOld = false;

          if (this.form.passOld !== this.form.password) {
            this.checkPassOld = true;
          }
          if (this.form.passOld == this.form.password && this.form.passNew && this.form.checkPass) {
            this.form = {
              ...this.form,
              password: this.form.passNew
            }
          }

          this.$store.dispatch('users/updateUser', this.form);
          this.$success({
              title: 'Thay đổi tài khoản thành công !',
            });
        } else {
          return false;
        }
      });
    },

    onChangePassword(e) {
      this.changePassWord = e.target.checked;
      this.checkPassOld = false;
    }
  },
}
</script>
