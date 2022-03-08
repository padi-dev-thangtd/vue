<template>
  <div class="voucher">
    <div class="voucher__img" :class="[
      {'bg-red': bgRed},
      {'bg-blue': bgBlue},
      {'bg-green': bgGreen}
    ]">
      <img src="~/assets/images/NhaSachTienPhong.png" width="165" alt="" loading="lazy">
    </div>
    <div class="voucher__content">
      <p class="font-20px font-weight-bold txt-purple">{{ nameVoucher }}</p>
      <p>{{ title }}</p>
      <p class="txt-black-3 font-12px font-italic" v-if="!disabled">HSD: {{ expiryDate }}</p>
      <p class="txt-black-3 font-12px font-italic" v-else><s>HSD: {{ expiryDate }}</s></p>

      <div v-if="showButton" class="voucher__content-use" :class="coin ? '' : 'flex-end'">
        <p v-if="coin" class="txt-yellow font-16px">Xu: {{ coin }}</p>
        <b-button v-if="isShowBtn" variant="success" @click="handleVoucher($event)" :disabled="disabled">{{ buyVoucher ? 'Mua voucher' : 'Sử dụng' }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgRed: {
      type: Boolean,
      default: false
    },
    bgBlue: {
      type: Boolean,
      default: false
    },
    bgGreen: {
      type: Boolean,
      default: false
    },
    nameVoucher: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    coin: {
      type: [String, Number],
      default: ''
    },
    expiryDate: {
      type: [String, Date],
      default: () => []
    },
    buyVoucher: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isShowBtn: {
      type: Boolean,
      default: true,
    }
  },

  methods: {
    handleVoucher(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style lang="scss" scoped>
  .voucher {
    width: 440px;
    display: grid;
    grid-template-columns: 150px 290px;
    align-items: center;
    height: 120px;
    box-shadow: 0.125rem 0.125rem 0.3125rem rgb(0 0 0 / 7%);

    &__img {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      p {
        text-align: center;
        font-size: 18px;
      }
    }

    &__content {
      padding: 10px;
      height: 100%;
      background-color: white;

      &-use {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          padding: 4px 10px;
          font-size: 14px;
          border-radius: 20px;
        }
      }
    }
  }

  .bg-red {
    background-color: #ee4d2d;
  }
  .bg-green {
    background-color: #31bfa5;
  }
  .bg-blue {
    background-color: #1b81ff;
  }
</style>
