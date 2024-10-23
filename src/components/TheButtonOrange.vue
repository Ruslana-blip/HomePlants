<template>
  <button class="btn" :style="{ width: width + 'px' }">{{ title }}</button>
</template>

<script>
export default {
  name: 'TheButtonOrange',
  props: {
    title: {
      type: String
    },
    width: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  height: 58px;
  border-radius: 16px;
  border: none;
  background-color: $primary-red-orange;
  font-family: 'ZenAntique';
  font-size: font-rem(18);
  text-transform: uppercase;
  color: $secondary-white;
  transition: $time;
  &:hover {
    box-shadow: 0px 6px 6px 0px $primary-orange;
  }
  &:active {
    position: relative;
    top: 2px;
    left: 2px;
  }
}
</style>
