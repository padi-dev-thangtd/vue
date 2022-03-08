<template>
  <div>
    <div class="carousel-introduce d-flex mt-3">
      <base-carousel :slideToShow="1" :listImages="listImages" class="mr-4"/>
      <img src="~/assets/images/sale20.svg" alt="" loading="lazy">
    </div>
    <div class="book-hot mt-4">
      <div class="book-hot__title">
        <img src="~/assets/images/giasoc.svg" alt="" loading="lazy">
        <img src="~/assets/images/flash.gif" alt="" loading="lazy">
        <img src="~/assets/images/homnay.svg" alt="" loading="lazy">
      </div>
      <div class="p-3">
        <base-carousel :slideToShow="5" :listStory="dataProduct"/>
      </div>
    </div>
    <div class="image-introduce mt-4">
      <img src="~/assets/images/zalopay.png" alt="" loading="lazy">
      <img src="~/assets/images/sua.jpg" alt="" loading="lazy">
      <img src="~/assets/images/sua2.jpg" alt="" loading="lazy">
      <img src="~/assets/images/sua3.jpg" alt="" loading="lazy" class="mr-0">
    </div>
    <div class="book-hot mt-5">
      <div class="p-3">
        <base-carousel :slideToShow="5" :listStory="dataProduct"/>
      </div>
    </div>

  </div>
</template>

<script>
import baseCarousel from '../components/formItems/baseCarousel.vue';
import { mapState } from 'vuex';
export default {
  components: { baseCarousel },
  // middleware: "authenticated",
  data() {
    return {
      listImages: [
        "https://cdn0.fahasa.com/media/magentothem/banner7/AirPAyT22021_920x420.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/vnpayt2-920x420.jpg",
        "https://cdn0.fahasa.com/media/magentothem/banner7/MOCA-1T01-920x420.png",
        "https://cdn0.fahasa.com/media/magentothem/banner7/Game_Trang-chung-920x420.jpg",
      ],
      dataProduct: null,
    }
  },

  computed: {
    ...mapState({
      listProducts: state => state.products.listProducts,
      listProductSearch: state => state.products.listProductSearch,
    }),
  },
  watch: {
    listProductSearch(data) {
      this.dataProduct = data.length > 0 ? data : this.listProducts
    }
  },

  created() {
    this.$store.dispatch('products/getListProduct');
    this.dataProduct = this.listProducts;
  },
}
</script>

<style lang="scss">
  @import '~/assets/style/page/index';
</style>
