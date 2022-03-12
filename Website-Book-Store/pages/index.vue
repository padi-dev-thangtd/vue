<template>
  <div>
    <div class="carousel-introduce d-flex mt-3">
      <base-carousel :slideToShow="1" :listImages="listImages" class="mr-4" />
      <img src="~/assets/images/sale20.svg" alt="" loading="lazy" />
    </div>
    <div class="book-hot mt-4">
      <div class="book-hot__title">
        <img src="~/assets/images/giasoc.svg" alt="" loading="lazy" />
        <img src="~/assets/images/flash.gif" alt="" loading="lazy" />
        <img src="~/assets/images/homnay.svg" alt="" loading="lazy" />
      </div>
      <div class="p-3">
        <div>
          <a-tabs default-active-key="all" @change="handleChangeType">
            <a-tab-pane key="all" tab="Tất cả">
              <div v-if="listProducts.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listProducts || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="Chính trị - Pháp luật"
              tab="Chính trị - Pháp luật"
              force-render
            >
              <div v-if="listChinhTriPhapLuat.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listChinhTriPhapLuat || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="Văn học nghệ thuật"
              tab="Văn học nghệ thuật"
              force-render
            >
              <div v-if="listVanHocNgheThuat.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listVanHocNgheThuat || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane key="Thiếu nhi" tab="Thiếu nhi">
              <div v-if="listThieuNhi.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listThieuNhi || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane key="Truyện, Tiểu thuyết" tab="Truyện, Tiểu thuyết">
              <div v-if="listTruyenTieuThuyet.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listTruyenTieuThuyet || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
            <a-tab-pane key="Giáo trình" tab="Giáo trình">
              <div v-if="listGiaoTrinh.length > 0">
                <base-carousel
                  :slideToShow="5"
                  :listStory="listGiaoTrinh || []"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="image-introduce mt-4">
      <img src="~/assets/images/zalopay.png" alt="" loading="lazy" />
      <img src="~/assets/images/sua.jpg" alt="" loading="lazy" />
      <img src="~/assets/images/sua2.jpg" alt="" loading="lazy" />
      <img src="~/assets/images/sua3.jpg" alt="" loading="lazy" class="mr-0" />
    </div>
    <div class="book-hot mt-5">
      <div class="p-3">
        <div v-if="listProducts.length > 0">
          <base-carousel :slideToShow="5" :listStory="listProducts || []" />
        </div>
        <div v-else>
          <a-empty />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseCarousel from "../components/formItems/baseCarousel.vue";
import { mapState } from "vuex";
export default {
  components: { baseCarousel },
  // middleware: "authenticated",
  data() {
    return {
      listImages: [
        "https://cdn0.fahasa.com/media/magentothem/banner7/AirPAyT22021_920x420.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/vnpayt2-920x420.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/MOCA-1T01-920x420.png",
        "https://cdn0.fahasa.com/media/magentothem/banner7/Game_Trang-chung-920x420.jpg"
      ],
      dataProduct: null,
      listChinhTriPhapLuat: [],
      listVanHocNgheThuat: [],
      listThieuNhi: [],
      listTruyenTieuThuyet: [],
      listGiaoTrinh: []
    };
  },

  computed: {
    ...mapState({
      listProducts: state => state.products.listProducts,
      listProductSearch: state => state.products.listProductSearch
    })
  },
  watch: {
    listProductSearch(data) {
      this.dataProduct = data.length > 0 ? data : this.listProducts;
    }
  },

  created() {
    this.$store.dispatch("products/getListProduct");
    this.dataProduct = this.listProducts;
  },

  methods: {
    filterType(key) {
      return this.listProducts.filter(data => data.type == key);
    },
    handleChangeType(key) {
      console.log({ key });
      if (key === "all") return;
      if (key === "Chính trị - Pháp luật") {
        return (this.listChinhTriPhapLuat = this.filterType(key));
      }
      if (key === "Văn học nghệ thuật") {
        return (this.listVanHocNgheThuat = this.filterType(key));
      }
      if (key === "Thiếu nhi") {
        console.log("xn chao");
        const data = this.filterType(key);
        console.log({ data });
        return (this.listThieuNhi = this.filterType(key));
      }
      if (key === "Truyện, Tiểu thuyết") {
        const data = this.filterType(key);
        console.log({ data });
        return (this.listTruyenTieuThuyet = this.filterType(key));
      }
      if (key === "Giáo trình") {
        return (this.listGiaoTrinh = this.filterType(key));
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/style/page/index";
</style>
