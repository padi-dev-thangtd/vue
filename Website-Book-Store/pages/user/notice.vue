<template>
  <div>
    <div class="text-center mb-3">
      <p class="font-24px font-weight-bold">Thông Báo</p>
    </div>

    <div class="text-center my-4">
      <b-icon icon="bell-fill" class="border rounded icon-notice mb-2"></b-icon>
      <p class="my-3">Chưa có thông báo nào !</p>
      <b-button pill variant="outline-danger" @click="$router.push('/')">TIẾP TỤC MUA SẮM</b-button>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconBellFill, BIconCamera } from 'bootstrap-vue';
export default {
  layout: 'user',
  components: {
    BIcon,
    BIconBellFill,
    BIconCamera
  },
}
</script>

<style lang="scss">
  @import '~/assets/style/page/cart';

  .icon-notice {
    border: none !important;
    font-size: 100px;
    color: #dcdcdc;
  }

  .btn-outline-danger {
    padding: 10px 25px;
  }
</style>