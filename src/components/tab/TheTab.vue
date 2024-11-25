<template>
  <div class="tab__content" v-show="selectedTitle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TheTab',
  props: {
    title: {
      type: String,
      required: true
    },
    selectedTitle: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  // .tab__content
  &__content {
    font-size: font-rem(18);
    font-family: 'Lato';
  }
}
</style>
