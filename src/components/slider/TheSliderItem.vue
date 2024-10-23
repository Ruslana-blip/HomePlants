<template>
  <div class="plant">
    <div class="plant__img">
      <img
        :src="Array.isArray(value.img) ? value.img[0] : value.img"
        :alt="value.name"
        :title="value.name"
      />
    </div>
    <RouterLink :to="{ name: 'TheSinglePlantPage', params: { id: value.id } }" class="plant__name">
      {{ value.name || value.title }}
    </RouterLink>
    <div class="plant__info">
      <span>{{ value?.price || value?.data }} ₴</span>
      <span class="plant__newArrivals">{{ value?.status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSliderItem',

  props: {
    value: {
      type: Object,
      required: true
    },
    newArrivals: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.plant {
  font-family: 'Lato';
  font-size: font-rem(18);
  color: $secondary-black;
  // .plant__img
  &__img {
    height: 480px;
    border-radius: 16px;
    & img {
      height: 100%;
    }
  }
  // .plant__name
  &__name {
    display: block;
    font-weight: 500;
    margin: 16px 0;
    transition: $time;
    &:hover {
      color: $dark-purple-gray;
    }
  }
  &__info {
    display: flex;
    justify-content: space-between;
  }
  &__newArrivals {
    width: 124px;
    height: 22px;
    border-radius: 2px;
    background-color: $secondary-green;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: font-rem(14);
    color: $white;
    text-transform: uppercase;
  }
}
</style>
