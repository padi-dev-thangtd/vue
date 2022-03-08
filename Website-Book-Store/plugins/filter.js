import Vue from 'vue';

Vue.mixin({
  filters: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  }
});