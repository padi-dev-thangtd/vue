<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px cursor-pointer">
        <span @click="$router.push('/admin/products')">Vouchers</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer">Add</a-breadcrumb-item>
    </a-breadcrumb>
    <div>
      <div class="font-24px text-center mb-3">Add voucher</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="nameVoucher" label="Tên voucher" prop="nameVoucher">
          <a-input v-model="form.nameVoucher" />
        </a-form-model-item>

        <a-form-model-item label="Ngày hết hạn" required prop="baseDate">
          <a-date-picker
            v-model="form.baseDate"
            type="date"
            placeholder="Pick a date"
            style="width: 65%;"
          />
        </a-form-model-item>

        <a-form-model-item ref="apply" label="Áp dụng hoá đơn" prop="apply">
          <a-input v-model="form.apply" />
        </a-form-model-item>

        <a-form-model-item ref="quantity" label="Số lượng voucher" prop="quantity">
          <a-input v-model="form.quantity" />
        </a-form-model-item>

        <a-form-model-item ref="coin" label="Giá voucher" prop="coin">
          <a-input v-model="form.coin" />
        </a-form-model-item>

        <a-form-model-item ref="logo" label="Logo" prop="logo">
          <a-select v-model="form.logo" placeholder="Chọn màu logo của voucher !">
            <a-select-option value="red">red</a-select-option>
            <a-select-option value="green">green</a-select-option>
            <a-select-option value="blue">blue</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 16, offset: 6 }">
          <a-button type="primary" @click="onSubmit">
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
import moment from 'moment';
export default {
  layout: 'admin',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      other: '',
      form: {
        nameVoucher: '',
        logo: undefined,
        baseDate: '',
        apply: '',
        coin: null,
        quantity:null,
      },
      rules: {
        nameVoucher: [{ required: true, message: 'Vui lòng nhập tên Voucher ...', trigger: 'blur' },],
        logo: [{ required: true, message: 'Vui lòng nhập tên Tác giả ...', trigger: 'blur' }],
        baseDate: [{ required: true, message: 'Vui lòng nhập đường dẫn ảnh ...', trigger: 'blur' }],
        apply: [{ required: true, message: 'Vui lòng nhập Giá sách ...', trigger: 'blur' }],
        coin: [{ required: true, message: 'Vui lòng nhập Thể loại ...', trigger: 'blur' }],
        quantity: [{ required: true, message: 'Vui lòng nhập số lượng voucher ...', trigger: 'blur' }],
      },
    };
  },
  methods: {
    ...mapActions({
      addListVoucher: 'vouchers/addListVoucher',
    }),

    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let dataVoucher = {
            ...this.form,
            baseDate: moment(this.form.baseDate).format('YYYY-MM-DD'),
          }
          await this.addListVoucher(dataVoucher);
          this.$router.push('/admin/vouchers/');
        } else {
          console.log('error submit!!');
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
