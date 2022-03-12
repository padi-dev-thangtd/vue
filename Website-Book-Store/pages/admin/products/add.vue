<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item class="font-16px cursor-pointer">
        <span @click="$router.push('/admin/products')">Products</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item class="font-16px text-underline cursor-pointer"
        >Add</a-breadcrumb-item
      >
    </a-breadcrumb>
    <div>
      <div class="font-24px text-center mb-3">Add product</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="Tên sách" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-form-model-item ref="auth" label="Tác giả" prop="auth">
          <a-input v-model="form.auth" />
        </a-form-model-item>

        <a-form-model-item ref="image" label="Ảnh sản phẩm" prop="image">
          <div class="clearfix">
            <a-upload
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              @change="handleChange"
              @remove="handleRemove"
            >
              <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-model-item>

        <a-form-model-item ref="type" label="Thể loại" prop="type">
          <a-select
            v-model="form.type"
            placeholder="Chọn thể loại của sản phẩm !"
          >
            <a-select-option value="Chính trị - Pháp luật"
              >Chính trị - Pháp luật</a-select-option
            >
            <a-select-option value="Văn học nghệ thuật"
              >Văn học nghệ thuật</a-select-option
            >
            <a-select-option value="Thiếu nhi">Thiếu nhi</a-select-option>
            <a-select-option value="Truyện, Tiểu thuyết"
              >Truyện, Tiểu thuyết</a-select-option
            >
            <a-select-option value="Giáo trình">Giáo trình</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item ref="price" label="Giá" prop="price">
          <a-input v-model="form.price" />
        </a-form-model-item>

        <a-form-model-item ref="quanlity" label="Số lượng" prop="quanlity">
          <a-input v-model="form.quanlity" />
        </a-form-model-item>

        <a-form-model-item ref="pageNumber" label="Số trang" prop="pageNumber">
          <a-input v-model="form.pageNumber" />
        </a-form-model-item>

        <a-form-model-item ref="rate" label="Đánh giá" prop="rate">
          <a-select v-model="form.rate" placeholder="Đánh giá sản phẩm ...">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
            <a-select-option value="5">5</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item ref="content" label="Nội dung" prop="content">
          <a-input
            v-model="form.content"
            type="textarea"
            placeholder="Nội dung của sản phẩm"
            :auto-size="{ minRows: 6, maxRows: 12 }"
          />
        </a-form-model-item>

        <a-form-model-item ref="sale" label="Giảm giá" prop="sale">
          <a-input v-model="form.sale" />
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
import { mapActions } from "vuex";

function getBase64(file) {
  if (!file) {
    return;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  layout: "admin",
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      other: "",
      form: {
        name: "",
        auth: "",
        image: "",
        price: null,
        type: undefined,
        quanlity: null,
        pageNumber: null,
        rate: undefined,
        content: "",
        sale: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Vui lòng nhập tên Sách ...",
            trigger: "blur"
          }
        ],
        auth: [
          {
            required: true,
            message: "Vui lòng nhập tên Tác giả ...",
            trigger: "blur"
          }
        ],
        image: [
          {
            required: true,
            message: "Vui lòng chọn ảnh sản phẩm ...",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Vui lòng nhập Giá sách ...",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "Vui lòng nhập Thể loại ...",
            trigger: "blur"
          }
        ],
        quanlity: [
          {
            required: true,
            message: "Vui lòng nhập Số lượng ...",
            trigger: "blur"
          }
        ],
        pageNumber: [
          {
            required: true,
            message: "Vui lòng nhập Số trang ...",
            trigger: "blur"
          }
        ],
        rate: [
          {
            required: true,
            message: "Vui lòng nhập Đánh giá sản phẩm ...",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "Vui lòng nhập Nội dung ...",
            trigger: "blur"
          }
        ],
        sale: [
          {
            required: true,
            message: "Vui lòng nhập Giảm giá sản phẩm ...",
            trigger: "blur"
          }
        ]
      },
      fileList: [],
      previewVisible: false,
      previewImage: ""
    };
  },
  methods: {
    ...mapActions({
      addListProduct: "products/addListProduct"
    }),

    onSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          await this.addListProduct(this.form);
          this.$router.push("/admin/products/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      this.previewVisible = true;
    },
    handleRemove() {
      console.log("remove");
    },
    async handleChange({ fileList }) {
      this.fileList = fileList;
      const file = fileList[0];

      if (!file) {
        this.form.image = "";
        return;
      }
      if (!file?.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.form.image = this.previewImage;
    }
  }
};
</script>
