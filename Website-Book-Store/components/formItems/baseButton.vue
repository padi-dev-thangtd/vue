<template>
  <div class="base-button">
    <button
      @click="handleClick"
      :disabled="disabled"
    >
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/style/components/baseButton';
</style>
