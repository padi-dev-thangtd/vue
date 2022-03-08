<template>
  <div class="base-carousel">
    <div v-if="listImages.length > 0">
      <VueSlickCarousel v-bind="settings" class="carousel carousel-img">
        <div v-for="(img, index) in listImages" :key="index" >
          <img :src="img" alt="" width="100%" loading="lazy">
        </div>
      </VueSlickCarousel>
    </div>
    <div v-if="listStory.length > 0">
      <VueSlickCarousel v-bind="settings" class="carousel hide-slick-dot">
        <div v-for="item in listStory" :key="item.id">
          <b-card
            :img-src="item.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="card-items"
            loading="lazy"
            @click="handleProductInfo(item._id)"
          >
            <b-card-text>
              {{ item.name }}
            </b-card-text>
            <b-form-rating variant="warning" inline :value="item.rate" disabled></b-form-rating>
            <p>
              <span class="font-16px font-weight-bold">{{ item.price | numberWithCommas }} ₫</span>
              <b-badge variant="danger" class="ml-1 font-10px">-{{ item.sale }}%</b-badge>
            </p>
        </b-card>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: { VueSlickCarousel },
  props: {
    slideToShow: {
      type: Number,
      default: 1
    },
    listImages: {
      type: Array,
      default: () => []
    },
    listStory: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      settings: {
        "dots": true,
        "centerPadding": '125px',
        "infinite": true,
        "initialSlide": 2,
        "speed": 500,
        "slidesToShow": this.slideToShow,
        "slidesToScroll": 1,
        "swipeToSlide": true
      }
    }
  },
  methods: {
    handleProductInfo(productId) {
      let dataHistoryLocal = JSON.parse(localStorage.getItem('history_view'));
      if (dataHistoryLocal) {
        dataHistoryLocal.push(productId);
        localStorage.setItem('history_view', JSON.stringify(_.uniq(dataHistoryLocal)));
      } else {
        localStorage.setItem('history_view', JSON.stringify([productId]));
      }
      this.$router.push(`books/${productId}`);
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/style/components/baseCarousel';
</style>
